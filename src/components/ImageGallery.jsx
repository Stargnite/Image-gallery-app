// import { images } from "../db/db";
import classes from "./imageGallery.module.css";
import SearchBox from "./SearchBox/SearchBox";
import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Navbar from "./navbar/Navbar";


 const images = [
  {
    "id": "1",
    "tag": "food",
    "url": "/src/assets/images/vegetables.jpg"
  },
  {
    "id": "2",
    "tag": "games",
    "url": "/src/assets/images/call-of-duty-1.jpg"
  },
  {
    "id": "3",
    "tag": "food",
    "url": "/src/assets/images/Tacos.webp"
  },
  {
    "id": "4",
    "tag": "cars",
    "url": "/src/assets/images/car-1.jpg"
  },
  {
    "id": "5",
    "tag": "food",
    "url": "/src/assets/images/burger-and-pizza.jpeg"
  },
  {
    "id": "6",
    "tag": "games",
    "url": "/src/assets/images/horizon.jpg"
  },
  {
    "id": "7",
    "tag": "food",
    "url": "/src/assets/images/food-content.jpg"
  },
  {
    "id": "8",
    "tag": "movies",
    "url": "/src/assets/images/joker.jpg"
  },
  {
    "id": "9",
    "tag": "games",
    "url": "/src/assets/images/call-of-duty-2.jpg"
  },
  {
    "id": "10",
    "tag": "food",
    "url": "/src/assets/images/Variety-fruits-vegetables.webp"
  },
  {
    "id": "11",
    "tag": "cars",
    "url": "/src/assets/images/car-2.jpg"
  },
  {
    "id": "12",
    "tag": "games",
    "url": "/src/assets/images/god-of-war.jpg"
  },
]


const SortableImages = ({ image }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: image.id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <img
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      src={image.url}
      alt={image.tag}
      className={classes.img}
    />
  );
};

const ImageGallery = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [imageList, setImagelist] = useState([]);

  // this function should filter images based on the selected tag
  const filterImages = (tag) => {
    setSelectedTag(tag);
  };

  useEffect(() => {
    const filteredImages = selectedTag
      ? images.filter((image) => image.tag.includes(selectedTag))
      : images;
    setImagelist(filteredImages);
  }, [selectedTag]);

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) {
      return;
    }
    setImagelist((prevImageList) => {
      const oldIndex = prevImageList.findIndex(
        (image) => image.id === active.id
      );
      const newIndex = prevImageList.findIndex((image) => image.id === over.id);

      const updatedImageList = arrayMove(imageList, oldIndex, newIndex);
      return updatedImageList;
    });
  };

  const filterImagesByTag = (tag) => {
    const filteredImages = tag
      ? images.filter((image) => image.tag.includes(tag))
      : images;
    setImagelist(filteredImages);
  };

  return (
    <div>
      <Navbar />
      <SearchBox onSearch={filterImagesByTag} />
      <div className={classes.search_tags}>
        <div
          className={`${classes.tag} ${
            selectedTag === null ? classes.active : ""
          }`}
          onClick={() => filterImages(null)}
        >
          All
        </div>
        <div
          className={`${classes.tag} ${
            selectedTag === "food" ? classes.active : ""
          }`}
          onClick={() => filterImages("food")}
        >
          Food
        </div>
        <div
          className={`${classes.tag} ${
            selectedTag === "games" ? classes.active : ""
          }`}
          onClick={() => filterImages("games")}
        >
          Games
        </div>
        <div
          className={`${classes.tag} ${
            selectedTag === "movies" ? classes.active : ""
          }`}
          onClick={() => filterImages("movies")}
        >
          Movies
        </div>
        <div
          className={`${classes.tag} ${
            selectedTag === "cars" ? classes.active : ""
          }`}
          onClick={() => filterImages("cars")}
        >
          Cars
        </div>
      </div>
      <div className={classes.image_list}>
        {imageList.length === 0 ? (
          <div className="centered">
            <h3>No items found</h3>
          </div>
        ) : (
          <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext
              items={imageList}
              strategy={horizontalListSortingStrategy}
            >
              {imageList.map((image) => {
                return <SortableImages key={image.id} image={image} />;
              })}
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
