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
const noteSpacing = 24;
const noteRadius = 8;

const colorBackground = "#17120F";
const colorBadgeBackground = "#fff";
const colorText = "#fff";

const fontSizeBody = 16;
const fontSizeSmall = 14;

const authorSpacing = 12;
const avatarSize = 28;

const currentTime = new Date();
const noteDate = currentTime.toUTCString();

function Widget() {
  const [note, setText] = useSyncedState("note", "");
  const [name, setName] = useSyncedState<string>("name", "");
  const [photoUrl, setPhotoUrl] = useSyncedState<string | null>("photoUrl", null);
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

    if(!photoUrl) {
      if (figma.currentUser) {
        setPhotoUrl(figma.currentUser.photoUrl);
      } else {
        figma.notify("Please login to figma");
      }
    }

    if(!userID) {
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
    // if (figma.currentUser) {
    //   if (figma.currentUser.id === userID) {
    //     console.log('users dont match');
    //   }
    // }

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
      name="KlarnaAnnotation"
      fill={colorBackground}
      cornerRadius={noteRadius}
      overflow="visible"
      direction="vertical"
      spacing={noteSpacing}
      padding={notePadding}
      width={noteWidth}
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
            fill={colorText}
            width={avatarSize}
            height={avatarSize}
          />
        )}
        <AutoLayout
          name="author-date"
          overflow="visible"
          direction="vertical"
          width="fill-parent"
        >
          <Text
            name="author"
            fill={colorText}
            width="fill-parent"
            verticalAlignText="center"
            lineHeight="130%"
            fontFamily="Roboto Mono"
            fontSize={fontSizeBody}
            letterSpacing={-0.56}
            fontWeight={500}
          >
            {name}
          </Text>
          <Text
            name="date"
            fill={colorText}
            width="fill-parent"
            verticalAlignText="center"
            lineHeight="130%"
            fontFamily="Roboto Mono"
            fontSize={fontSizeSmall}
            letterSpacing={-0.48}
          >
            {date}
          </Text>
        </AutoLayout>
      </AutoLayout>
      <Input
        width="fill-parent"
        fontSize={fontSizeBody}
        fontWeight="normal"
        fill={colorText}
        inputFrameProps={{
          fill: colorBackground,
          overflow: "visible",
          verticalAlignItems: "center",
        }}
        inputBehavior="multiline"
        onTextEditEnd={(e) => (
          setText(
            e.characters.trim()),
            updateAuthor()
        )}
        placeholder="Write your design notes here..."
        value={note}
        // hidden={true}
      />
      <Frame
        name="badge"
        x={-22}
        y={54}
        positioning="absolute"
        fill={colorBadgeBackground}
        cornerRadius={1.8333333730697632}
        strokeWidth={0.978}
        width={44}
        height={22}
      >
        <Frame
          name="klarna-logo"
          x={{
            type: "horizontal-scale",
            leftOffsetPercent: 12.5,
            rightOffsetPercent: 10.5,
          }}
          y={{
            type: "vertical-scale",
            topOffsetPercent: 33.333,
            bottomOffsetPercent: 32.291,
          }}
          strokeWidth={1.417}
          overflow="visible"
          width={33.88}
          height={7.563}
        >
          <SVG
            name="path"
            x={{
              type: "left-right",
              leftOffset: 0,
              rightOffset: 0.032,
            }}
            y={{
              type: "top-bottom",
              topOffset: 0,
              bottomOffset: -0.437,
            }}
            height={8}
            width={34}
            src="<svg width='35' height='9' viewBox='0 0 35 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
<path fill-rule='evenodd' clip-rule='evenodd' d='M4.78931 0.333328H6.45564C6.45564 2.03309 5.82865 3.61442 4.71475 4.79026L7.06681 8.18499H4.96555L2.40901 4.49481L3.06876 3.97208C4.16345 3.10366 4.78931 1.7783 4.78931 0.333328ZM27.4331 5.4685C27.4331 6.24123 28.0556 6.86563 28.8238 6.86563C29.592 6.86563 30.2144 6.24123 30.2144 5.4685C30.2144 4.69817 29.592 4.07257 28.8238 4.07257C28.0556 4.07257 27.4331 4.69817 27.4331 5.4685ZM30.219 3.10248V2.75319H31.7554V8.18381H30.219V7.83692C29.7863 8.14912 29.2632 8.33333 28.6984 8.33333C27.2038 8.33333 25.9927 7.05103 25.9927 5.4685C25.9927 3.88716 27.2038 2.60367 28.6984 2.60367C29.2632 2.60367 29.7863 2.78908 30.219 3.10248ZM0.5 8.18514H2.20587V0.333474H0.5V8.18514ZM9.16952 8.18274H7.56194V0.333474H9.16952V8.18274ZM23.2645 2.60772C22.6522 2.60772 22.0715 2.80988 21.684 3.3661V2.75485H20.1555V8.18307H21.7021V5.33021C21.7021 4.50485 22.2251 4.10054 22.8555 4.10054C23.5288 4.10054 23.9174 4.52638 23.9174 5.31944V8.18307H25.4505V4.72973C25.4505 3.46777 24.5015 2.60772 23.2645 2.60772ZM11.2386 5.4685C11.2386 6.24123 11.8611 6.86563 12.6293 6.86563C13.3975 6.86563 14.0199 6.24123 14.0199 5.4685C14.0199 4.69817 13.3975 4.07257 12.6293 4.07257C11.8611 4.07257 11.2386 4.69817 11.2386 5.4685ZM14.0244 3.10248V2.75319H15.5609V8.18381H14.0244V7.83692C13.5918 8.14912 13.0687 8.33333 12.5039 8.33333C11.0092 8.33333 9.7982 7.05103 9.7982 5.4685C9.7982 3.88716 11.0092 2.60367 12.5039 2.60367C13.0687 2.60367 13.5918 2.78908 14.0244 3.10248ZM17.9348 3.4617V2.75476H16.3634V8.18299H17.9382V5.6483C17.9382 4.79304 18.8138 4.33371 19.4204 4.33371H19.4396V2.75476C18.816 2.75476 18.2421 3.03826 17.9348 3.4617ZM32.4208 7.27854C32.4208 6.71395 32.8524 6.25702 33.3845 6.25702C33.9166 6.25702 34.3481 6.71395 34.3481 7.27854C34.3481 7.84074 33.9166 8.29768 33.3845 8.29768C32.8524 8.29768 32.4208 7.84074 32.4208 7.27854Z' fill='#17120F'/>
</svg>
"
          />
        </Frame>
      </Frame>
    </AutoLayout>
  );
}

widget.register(Widget);
function checkAuthor(arg0: (e: any) => void) {
  throw new Error("Function not implemented.");
}
