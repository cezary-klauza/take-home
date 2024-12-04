import { useEffect, useRef, useState } from "react";
import { useGetListData } from "../api/getListData";
import { Card, DeletedCard } from "./List";
import { Spinner } from "./Spinner";
import { useStore } from "../store";
import autoAnimate from "@formkit/auto-animate";
import { ToggleButton } from "./Buttons";

export const Entrypoint = () => {
  const listQuery = useGetListData();

  const { visibleCards, setVisibleCards, setCards, reveal, deletedCards } =
    useStore();

  const [refreshLoading, setRefreshLoding] = useState(false);

  const visibleCardsDiv = useRef<HTMLDivElement>(null);
  const deletedCardsDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // setting state
    if (listQuery.isLoading) {
      return;
    }

    setRefreshLoding(false);

    if (listQuery?.data) setCards(listQuery.data);

    setVisibleCards(listQuery.data?.filter((item) => item.isVisible) ?? []);

    //setting animations
    if (visibleCardsDiv?.current) autoAnimate(visibleCardsDiv.current);
    if (deletedCardsDiv?.current) autoAnimate(deletedCardsDiv.current);
  }, [listQuery.data, listQuery.isLoading, setCards, setVisibleCards]);

  if (listQuery.isLoading) {
    return <Spinner />;
  }

  const refreshHandler = () => {
    setRefreshLoding(true);
    listQuery.refetch();
  };

  return (
    <div className="flex gap-x-16 max-w-5xl w-full">
      <div className="w-full">
        <h1 className="mb-1 font-medium text-lg">
          My Awesome List ({visibleCards.length})
        </h1>
        <div ref={visibleCardsDiv} className="flex flex-col gap-y-3 w-full">
          {visibleCards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">
            Deleted Cards ({deletedCards.length})
          </h1>
          <div className="space-x-4">
            <ToggleButton onClick={refreshHandler} disabled={refreshLoading}>
              {refreshLoading && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Spinner size={16} stroke="white" />
                </div>
              )}
              <p className={refreshLoading ? "opacity-0" : "opacity-100"}>
                Refresh
              </p>
            </ToggleButton>
            <ToggleButton disabled={deletedCards.length === 0} onClick={reveal}>
              Reveal
            </ToggleButton>
          </div>
        </div>
        <div ref={deletedCardsDiv} className="flex flex-col gap-y-3">
          {deletedCards.map((card) => (
            <DeletedCard key={card.id} id={card.id} title={card.title} />
          ))}
        </div>
      </div>
    </div>
  );
};
