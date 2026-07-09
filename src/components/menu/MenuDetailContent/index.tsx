import { getMenuItemBySlug } from '@/lib/wordpress';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function MenuDetailContent({ params }: Props) {
  const { slug } = await params;
  const menuItem = await getMenuItemBySlug(slug);

  if (!menuItem) {
    return (
      <div className='px-4'>
        <div className='mx-auto flex max-w-240 justify-center'>
          <p>This page could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='px-4'>
      <div className='mx-auto flex max-w-240'>
        <div>{menuItem?.title}</div>
      </div>
    </div>
  );
}
