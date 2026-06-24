import type { FavoriteCardProps } from "@/models/model";
import { Card, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Trash2Icon } from "lucide-react";

function FavoriteCard({
  location,
  navigateLocation,
  removeFavorite,
}: FavoriteCardProps) {
  return (
    <Card className="w-full px-3" onClick={navigateLocation}>
      <CardTitle>
        {location}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            removeFavorite();
          }}
        >
          <Trash2Icon />
        </Button>
      </CardTitle>
    </Card>
  );
}

export default FavoriteCard;
