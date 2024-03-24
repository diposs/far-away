import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: "Begin"
    }
  ],
  image: `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/QmZBRmu8GN8jw7GQCXfsxaFX5vUgmJksC7xW2uJNsaT1YD`,
  post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'The MarketPLACE',
  description: 'A frame exploring The MarketPLACE',
  openGraph: {
    title: 'The MarketPLACE',
    description: 'A frame exploring The MarketPLACE',
    images: [`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/QmZBRmu8GN8jw7GQCXfsxaFX5vUgmJksC7xW2uJNsaT1YD`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>The MarketPLACE</h1>
    </>
  );
}
