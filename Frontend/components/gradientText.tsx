export function GradientText({ text }: { text: string }) {
  return (
    <p className="text-center mb-10 text-muted-foreground font-StNoBills text-2xl">
      {text.split(' ').map((word, i) => (
        <span key={i} className="text-gradient text-glow-gradient inline-block mr-[0.25ch]" >
          {word + ' '}
        </span>
      ))}
    </p>
  );
}

