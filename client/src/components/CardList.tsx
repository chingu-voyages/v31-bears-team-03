// @ts-nocheck
import Card from './Card';

const CardList = ({ data, setColors, user, getData }) => {
  if (data) {
    return (
      <div className="flex justify-center">
        <ul className="my-12 md:flex md:flex-wrap md:justify-center">
          {data.map((palette, i) => (
            <li key={palette.id} className="mb-10 md:mx-5">
              <Card
                palette={palette}
                setColors={setColors}
                user={user}
                getData={getData}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return null;
  }
};

export default CardList;
