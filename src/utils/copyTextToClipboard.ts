import * as Clipboard from "expo-clipboard";
const copyTextToClipboard = (text: string) => {
  Clipboard.setStringAsync(text);
};
export default copyTextToClipboard;
