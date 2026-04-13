export default function TopSectionTitle({ title }: { title: string }) {
  return (
    <h2 className='font-display text-primary text-center text-2xl font-light tracking-wide sm:text-3xl'>
      {title}
    </h2>
  );
}
