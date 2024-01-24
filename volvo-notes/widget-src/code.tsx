const { widget } = figma;
const {
    AutoLayout,
    Ellipse,
    Frame,
    Image,
    Rectangle,
    SVG,
    Text,
    Input,
    useSyncedState,
    useEffect,
} = widget;

const noteWidth = 600;
const notePadding = 48;
const noteSpacing = 36;
const noteRadius = 8;

const colorBackground = "#2d2d2d";
const colorBadgeBackground = "#a3a3a3";
const colorTextPrimary = "#f5f5f5";
const colorTextSecondary = "#a3a3a3";

const fontFamily = "Inter";
const fontSizeBody = 16;
const fontSizeSmall = 14;

const lineHeightLabels = 16;
const lineHeightParagraph = 22;

const authorSpacing = 12;
const avatarSize = 32;

const currentTime = new Date();
const noteDate = currentTime.toUTCString();

function Widget() {
    const [note, setText] = useSyncedState("note", "");
    const [name, setName] = useSyncedState<string>("name", "");
    const [photoUrl, setPhotoUrl] = useSyncedState<string | null>(
        "photoUrl",
        null
    );
    const [userID, setUserID] = useSyncedState<string | null>("userID", null);
    const [date, setDate] = useSyncedState<string>("date", "");

    useEffect(() => {
        if (!name) {
            if (figma.currentUser) {
                setName(figma.currentUser.name);
            } else {
                figma.notify("Please login to figma");
            }
        }

        if (!photoUrl) {
            if (figma.currentUser) {
                setPhotoUrl(figma.currentUser.photoUrl);
            } else {
                figma.notify("Please login to figma");
            }
        }

        if (!userID) {
            if (figma.currentUser) {
                setUserID(figma.currentUser.id);
            } else {
                figma.notify("Please login to figma");
            }
        }

        if (!date) {
            setDate(noteDate);
        }
    });

    const updateAuthor = () => {
        if (figma.currentUser) {
            setName(figma.currentUser.name);
            setPhotoUrl(figma.currentUser.photoUrl);
            setUserID(figma.currentUser.id);
            setDate(noteDate);
        } else {
            figma.notify("Please login to figma");
        }
    };

    return (
        <AutoLayout
            name="VolvoNote"
            fill={colorBackground}
            cornerRadius={noteRadius}
            overflow="visible"
            direction="vertical"
            spacing={noteSpacing}
            padding={notePadding}
            width={noteWidth}
        >
            <AutoLayout
                name="header"
                overflow="visible"
                spacing={noteSpacing}
                width="fill-parent"
            >
                <AutoLayout
                    name="author"
                    overflow="visible"
                    spacing={authorSpacing}
                    width="fill-parent"
                    verticalAlignItems="center"
                >
                    {photoUrl ? (
                        <Image
                            cornerRadius={avatarSize}
                            width={avatarSize}
                            height={avatarSize}
                            src={photoUrl}
                        />
                    ) : (
                        <Ellipse
                            name="avatar"
                            fill={colorTextPrimary}
                            width={avatarSize}
                            height={avatarSize}
                        />
                    )}
                    <AutoLayout
                        name="author-date"
                        overflow="visible"
                        spacing={4}
                        direction="vertical"
                        width="fill-parent"
                    >
                        <Text
                            name="author"
                            fill={colorTextPrimary}
                            width="fill-parent"
                            verticalAlignText="center"
                            lineHeight={lineHeightLabels}
                            fontFamily={fontFamily}
                            fontSize={fontSizeBody}
                            letterSpacing={-0.56}
                            fontWeight={500}
                        >
                            {name}
                        </Text>
                        <Text
                            name="date"
                            fill={colorTextSecondary}
                            width="fill-parent"
                            verticalAlignText="center"
                            lineHeight={lineHeightLabels}
                            fontFamily={fontFamily}
                            fontSize={fontSizeSmall}
                            letterSpacing={-0.48}
                        >
                            {date}
                        </Text>
                    </AutoLayout>
                </AutoLayout>
                <SVG
                    name="logo"
                    height={7}
                    width={84}
                    src="<svg width='84' height='7' viewBox='0 0 84 7' fill='none' xmlns='http://www.w3.org/2000/svg'>
  <path fill-rule='evenodd' clip-rule='evenodd' d='M19.9493 3.2957C19.9493 1.46185 21.4781 0 24.3563 0C27.2353 0 28.7801 1.46185 28.7801 3.2957C28.7801 5.15566 27.3237 6.63823 24.3731 6.63823C21.4215 6.63823 19.9493 5.15566 19.9493 3.2957ZM22.8309 3.25697C22.8115 4.43239 23.2733 5.61502 24.3244 5.63394C25.4074 5.65465 25.8727 4.45941 25.8922 3.31191C25.9134 2.09505 25.3932 1.0142 24.4085 0.996185C23.4237 0.979071 22.8522 2.04011 22.8309 3.25697Z' fill='white' fill-opacity='0.64'/>
  <path d='M1.42269 1.10286L4.31409 6.45037L7.66114 6.45307L10.503 1.10286H11.9275V0.133698H7.64256V1.10286H8.88034L6.81088 4.99753L4.714 1.10286H6.21809L6.21721 0.133698H0.00088476L0 1.10286H1.42269Z' fill='white' fill-opacity='0.64'/>
  <path d='M38.2578 1.10016V0.133698L43.9902 0.134598V1.10106H42.5622V5.4659H43.8858C45.112 5.4659 45.9163 4.64085 45.9163 3.52217H46.8621V6.44498L38.2578 6.44588V5.4668H39.7026L39.7009 1.10016H38.2578Z' fill='white' fill-opacity='0.64'/>
  <path d='M56.6392 1.10286L59.5297 6.45037L62.8777 6.45307L65.7195 1.10286H67.144V0.133698H62.8591V1.10286H64.0969L62.0274 4.99753L59.9305 1.10286H61.4337V0.133698H55.2174L55.2165 1.10286H56.6392Z' fill='white' fill-opacity='0.64'/>
  <path fill-rule='evenodd' clip-rule='evenodd' d='M75.1691 3.2957C75.1691 1.46185 76.698 0 79.5761 0C82.4552 0 84 1.46185 84 3.2957C84 5.15566 82.5437 6.63823 79.5929 6.63823C76.6413 6.63823 75.1691 5.15566 75.1691 3.2957ZM78.0508 3.25697C78.0313 4.43239 78.4932 5.61502 79.5443 5.63394C80.6264 5.65465 81.0917 4.45941 81.1112 3.31191C81.1324 2.09505 80.6131 1.0142 79.6283 0.996185C78.6436 0.979071 78.072 2.04011 78.0508 3.25697Z' fill='white' fill-opacity='0.64'/>
  </svg>
  "
                />
            </AutoLayout>
            <Input
                width="fill-parent"
                fontFamily={fontFamily}
                fontSize={fontSizeBody}
                fontWeight="normal"
                lineHeight={lineHeightParagraph}
                fill={colorTextPrimary}
                inputFrameProps={{
                    overflow: "visible",
                    verticalAlignItems: "center",
                }}
                inputBehavior="multiline"
                onTextEditEnd={(e) => (
                    setText(e.characters.trim()), updateAuthor()
                )}
                placeholder="Write your note content here..."
                value={note}
                // hidden={true}
            />
        </AutoLayout>
    );
}

widget.register(Widget);
