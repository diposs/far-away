import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: "Begin"
    }
  ],
  image: `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/QmVApz4Co3JDcAFyg9aCtasfK7bgCXsM9UyeFhdo8xT7z4`,
  post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'The MarketPLACE',
  description: 'A frame exploring The MarketPLACE',
  openGraph: {
    title: 'The MarketPLACE',
    description: 'A frame exploring The MarketPLACE',
    images: [`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/QmVApz4Co3JDcAFyg9aCtasfK7bgCXsM9UyeFhdo8xT7z4`],
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
