import { Button, Box } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type FetchImagesResponse = {
  data: Array<{
    description: string;
    id: string;
    title: string;
    ts: number;
    url: string;
  }>;
  after: string | null;
};

export default function Home(): JSX.Element {
  const fetchImages = async ({pageParam = null}) => {
    const res = await api.get('api/images', {
      params: {
        after: pageParam
      }
    })
    const { data } = res.data;
    return {
      data,
    };
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    fetchImages,
    {
      getNextPageParam: l => l.data.after,
    }
  );

  

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    if (!data?.pages.length) return []; //

    const images: FetchImagesResponse['data'] = [];

    data.pages.forEach(page => {
      images.push(...page.data);
    });

    return images;
  }, [data]);

  useEffect(() => {console.log(formattedData)}, [formattedData])

  // TODO RENDER LOADING SCREEN
  if (isLoading){
    return (
      <Loading />
    )
  }

  // TODO RENDER ERROR SCREEN
  if (isError) {
    return (
      <Error />
    )
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}

        {hasNextPage && (
          <Button 
            isLoading={isFetchingNextPage}
            loadingText="Carregando..."
            onClick={() => fetchNextPage()}>
              Ver mais
          </Button>
        )}
      </Box>
    </>
  );
}
