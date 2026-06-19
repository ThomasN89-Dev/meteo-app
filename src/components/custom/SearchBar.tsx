import { useState } from "react";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import type { searchBarProps } from "@/models/model";

function SearchBar({ onSearch }: searchBarProps) {
  const [userInput, setUserInput] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    onSearch(userInput);
  };
  return (
    <>
      <form onSubmit={handleSearch}>
        <Field orientation="horizontal">
          <FieldLabel htmlFor="input-field-location" className="font-bold">
            Località
          </FieldLabel>
          <Input
            id="input-field-location"
            type="text"
            placeholder="Scegli località"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <Button variant="default">Cerca</Button>
        </Field>
      </form>
    </>
  );
}

export default SearchBar;
