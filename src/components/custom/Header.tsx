import { useTheme } from "@/context/ThemeSwitch";
import { Field, FieldLabel } from "../ui/field";
import { Switch } from "../ui/switch";
import { useEffect } from "react";

interface HeaderProps {
  title: string;
}
function Header({ title }: HeaderProps) {
  const { state, dispatch } = useTheme();
  const theme = state.theme;

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className=" w-full flex justify-between items-center py-4">
      <div>
        <h1>{title}</h1>
      </div>
      <Field orientation="horizontal" className="flex">
        <FieldLabel
          htmlFor="switch-theme"
          className={theme === "light" ? "hidden" : ""}
        >
          Modalità chiara
        </FieldLabel>
        <Switch
          id="switch-theme"
          onCheckedChange={() => dispatch({ type: "TOGGLE_THEME" })}
        />
        <FieldLabel
          htmlFor="switch-theme"
          className={theme === "dark" ? "opacity-0" : ""}
        >
          Modalità scura
        </FieldLabel>
      </Field>
    </div>
  );
}

export default Header;
