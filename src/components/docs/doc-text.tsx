/** Doc copy, with **label** rendered bold: the way a button or field is named in the app. */
export function DocText({ children }: { children: string }) {
  const parts = children.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <b key={i} className="font-extrabold text-ink">
            {part}
          </b>
        ) : (
          part
        ),
      )}
    </>
  );
}
