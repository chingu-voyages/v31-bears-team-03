// @ts-nocheck
import Card from './Card';

const CardList = ({setColors}) => {
  // fetch all palettes from server
  const mockList = [
    {
      id: 1,
      likes: 20,
      colors: [
        { color: '#0A212B' },
        { color: '#144155' },
        { color: '#1D617F' },
        { color: '#676767' },
        { color: '#818181' },
      ],
    },
    {
      id: 2,
      likes: 50,
      colors: [
        { color: '#C87687' },
        { color: '#CB8079' },
        { color: '#CD9B7C' },
        { color: '#CFB67E' },
        { color: '#D1D181' },
      ],
    },
    {
      id: 3,
      likes: 10,
      colors: [
        { color: '#868598' },
        { color: '#89889D' },
        { color: '#A28C8B' },
        { color: '#A78F8E' },
        { color: '#91AC92' },
        { color: '#94B195' },
        { color: '#97B698' },
        { color: '#9ABB9C' },
      ],
    },
    {
      id: 4,
      likes: 2,
      colors: [
        { color: '#181025' },
        { color: '#3D2862' },
        { color: '#707070' },
      ],
    },
  ];

  const data = mockList.sort((a, b) => (a.likes < b.likes ? 1 : -1));

  if (data) {
    return (
      <div className="flex justify-center">
        <ul className="my-12 md:flex md:flex-wrap md:justify-center">
          {data.map((palette, i) => (
            <li key={palette.id} className="mb-10 md:mx-5">
              <Card palette={palette} setColors={setColors} />
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
