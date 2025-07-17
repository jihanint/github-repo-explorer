import { useState } from 'react';

type Props = {
  onSubmit: (query: string) => void;
};

export default function SearchBox({ onSubmit }: Props) {
  const [text, setText] = useState('');

  const trigger = () => {
    const keyword = text.trim();
    if (keyword) onSubmit(keyword);
  };

  return (
    <div className="search-area">
      <input
        type="text"
        placeholder="Enter username"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && trigger()}
      />
      <button className="search-btn" onClick={trigger}>Search</button>
    </div>
  );
}
