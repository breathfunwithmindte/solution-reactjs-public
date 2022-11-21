import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const FreeStyleIcons = ({name}) => {
  switch (name) {
    case "send_icon": return <SendIcon /> /** @comment */
    case "inbox_icon": return <InboxIcon /> /** @comment  */
    case "drafts_icon": return <DraftsIcon /> /** @comment  */
    case "expand_less": return <ExpandLess /> /** @comment used in nav */
    case "expand_more": return <ExpandMore /> /** @comment used in nav */
    case "star_border": return <StarBorder /> /** @comment  */
    case "add": return <AddIcon /> /** @comment add icon  */
    case "remove": return <RemoveCircleOutlineIcon /> /** @comment remove icon */
  }
}

export default FreeStyleIcons; 