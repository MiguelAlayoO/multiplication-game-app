import { LuDelete } from "react-icons/lu";
import { MdOutlineArrowForwardIos } from "react-icons/md";

export type objectButton = {
  id: string;
  name: string;
  hasIcon: boolean;
  icon?: JSX.Element;
};

export const buttonData: objectButton[] = [
  { id: "btn1", name: "1", hasIcon: false },
  { id: "btn2", name: "2", hasIcon: false },
  { id: "btn3", name: "3", hasIcon: false },
  { id: "btn4", name: "backspace", hasIcon: true, icon: <LuDelete /> },
  { id: "btn5", name: "4", hasIcon: false },
  { id: "btn6", name: "5", hasIcon: false },
  { id: "btn7", name: "6", hasIcon: false },
  { id: "btn8", name: "7", hasIcon: false },
  { id: "btn9", name: "8", hasIcon: false },
  { id: "btn10", name: "9", hasIcon: false },
  { id: "btn11", name: "-", hasIcon: false },
  { id: "btn12", name: "0", hasIcon: false },
  { id: "btn13", name: ".", hasIcon: false },
  {
    id: "btn14",
    name: "enter",
    hasIcon: true,
    icon: <MdOutlineArrowForwardIos />,
  },
];
