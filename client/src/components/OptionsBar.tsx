import React from 'react';
import exploreService from '../services/exploreService';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';

const colorModes: { title: string; mode: string }[] = [
  { title: 'Analogic', mode: 'analogic' },
  { title: 'Analogic Complement', mode: 'analogic-complement' },
  { title: 'Triadic', mode: 'triad' },
  { title: 'Quadratic', mode: 'quad' },
  { title: 'Complement', mode: 'complement' },
  { title: 'Monochrome', mode: 'monochrome' },
  { title: 'Monochrome Dark', mode: 'monochrome-dark' },
  { title: 'Monochrome Light', mode: 'monochrome-light' },
];

interface OptionsProps {
  colors: {
    id: string;
    color: string;
    lock: boolean;
  }[];
  colorMode: string;
  setColorMode: (mode: string) => void;
  checkLockGenerate: any;
  addColor: () => void;
  length: number;
}

const OptionsBar = ({
  colors,
  colorMode,
  setColorMode,
  checkLockGenerate,
  addColor,
  length,
}: OptionsProps) => {
  const numberOfItems = colorModes.length;
  const { buttonProps, isOpen, setIsOpen } = useDropdownMenu(numberOfItems);

  const saveColor = () => {
    exploreService.addPalette(colors);
  };

  const formatString = () => {
    let string: any[] = [];
    colors.map((color) => {
      return string.push(color.color);
    });

    return string.join(',');
  };

  const displayAdd = () => {
    if (length < 10) {
      return (
        <button style={{ marginRight: '2%' }} onClick={addColor}>
          Add Colors{' '}
        </button>
      );
    } else {
      return <p>Max colors</p>;
    }
  };

  const handleClickMode = (mode: { title: string; mode: string }) => {
    setColorMode(mode.mode);
    setIsOpen(false);
  };

  return (
    <div className="flex justify-end">
      <div
        className="relative"
        style={{
          marginRight: '2%',
        }}
      >
        <button {...buttonProps} onClick={() => setIsOpen(true)}>
          Scheme
        </button>
        <div
          role="menu"
          id="menu"
          className="absolute flex flex-col bg-white shadow-md"
          style={{
            visibility: isOpen ? 'visible' : 'hidden',
          }}
        >
          {colorModes.map((mode) => {
            return (
              <button
                key={mode.title}
                className={`text-left whitespace-nowrap px-4 py-1 ${
                  colorMode === mode.mode ? `bg-gray-200` : `white`
                } hover:bg-gray-200`}
                onClick={() => handleClickMode(mode)}
              >
                {mode.title}
              </button>
            );
          })}
        </div>
      </div>

      <button style={{ marginRight: '2%' }} onClick={checkLockGenerate}>
        Generate
      </button>
      {displayAdd()}
      <button style={{ marginRight: '2%' }} onClick={saveColor}>
        Save
      </button>
      <button
        style={{ marginRight: '2%' }}
        onClick={() => {
          navigator.clipboard.writeText(formatString());
        }}
      >
        Export
      </button>
    </div>
  );
};

export default OptionsBar;
