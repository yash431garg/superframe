
import type { Metadata, ResolvingMetadata } from 'next'
import { supabase } from '../../lib/supabase'

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_APP_URL;



const getSpecificBlog = async (postId: string) => {
  try {
    const blogDataQuery = await supabase
      .from('events')
      .select()
      .eq('id', postId);
    const { data, error } = blogDataQuery;
    if (error) {
      throw new Error('Network response was not ok');
    }
    return data[0];
  } catch (error) {
    console.error('Error during POST request:', error);
    // Handle error as needed
  }
};




type Props = {
  params: { id: string }

}


export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id
  const blogPost: any = await getSpecificBlog(id)


  return {
    title: 'Luma Frames',
    description: 'Create your own Event Frame.',
    openGraph: {
      title: 'Luma Frames',
      description: 'Create your own Event Frame.',
      images: `${blogPost?.image_link}`,
    },
    other:
    {
      'fc:frame': 'vNext',
      'fc:frame:image': `${blogPost?.image_link}`,
      'fc:frame:image:aspect_ratio': ' 1.91:1 ',
      'fc:frame:input:text': 'Please enter your email',
      'fc:frame:button:1': 'Subscribe',
      'fc:frame:button:1:action': 'post',
      'fc:frame:button:2': 'Visit',
      'fc:frame:button:2:action': 'link',
      'fc:frame:button:2:target': `${blogPost?.event}`,
      'fc:frame:post_url': `${NEXT_PUBLIC_URL}/api/subscribe`
    }
    ,
  }
}

export default function Page({ params }: { params: { id: string } }) {

  return <div>
    <p className="ml-5 mt-5 text-lg">
      Happy Casting!
    </p>
  </div>
}
