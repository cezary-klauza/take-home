import { FC, useEffect, useRef, useState } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton } from "./Buttons";
import autoAnimate from "@formkit/auto-animate";
import { useStore } from "../store";

type CardProps = {
  id: ListItem["id"];
  title: ListItem["title"];
};

type VisibleCardProps = CardProps & {
  description: ListItem["description"];
};

type DeletedCardProps = CardProps;

export const Card: FC<VisibleCardProps> = ({ id, title, description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const parent = useRef<HTMLDivElement>(null);

  const { deleteCard } = useStore();

  const toggleDescription = () => setIsExpanded((prev) => !prev);
  const toggleDelete = () => deleteCard(id);

  useEffect(() => {
    if (parent?.current) autoAnimate(parent.current);
  }, [parent]);

  return (
    <div ref={parent} className="border border-black px-2 py-1.5 w-full">
      <div className="flex justify-between mb-0.5 w-full">
        <h1 className="font-medium">{title}</h1>
        <div className="flex">
          <ExpandButton onClick={toggleDescription} isExpanded={isExpanded} />
          <DeleteButton onClick={toggleDelete} />
        </div>
      </div>
      {isExpanded && description && (
        <p className="text-sm w-full">{description}</p>
      )}
    </div>
  );
};

export const DeletedCard: FC<DeletedCardProps> = ({ id, title }) => {
  const [description, setDescription] = useState("");
  const parent = useRef<HTMLDivElement>(null);

  const { isRevealed, cards } = useStore();

  useEffect(() => {
    if (isRevealed) {
      setDescription(cards.filter((item) => item.id === id)[0].description);
    } else setDescription("");
  }, [cards, id, isRevealed]);

  useEffect(() => {
    if (parent?.current) autoAnimate(parent.current);
  }, [parent]);

  return (
    <div ref={parent} className="border border-black px-2 py-1.5 w-full">
      <div className="flex justify-between mb-0.5 w-full">
        <h1 className="font-medium">{title}</h1>
      </div>
      {description !== "" && <p className="text-sm w-full">{description}</p>}
    </div>
  );
};
