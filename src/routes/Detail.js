import { useParams } from 'react-router';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
  /* width: 50%; */
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center center;
`;

//쿼리에 variable이 있을 때는 다음과 변수의 타입을 써주고, 변수를 쿼리에 써준다.

//10. isFucked를 Detail 페이지에서도 쓰고 싶다면 필드에 isFucked를 추가. 마찬가지로 @client명시
const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      language
      rating
      medium_cover_image
      description_full
      isLiked @client
      isFucked @client
    }
    suggestions(id: $id) {
      id
      title
      medium_cover_image
    }
  }
`;

const Detail = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: {
      id,
    },
  });
  // console.log(data);

  return (
    <Container>
      <Column>
        <Title>
          {loading ? 'loading...' : `${data?.movie?.title} ${data?.movie?.isLiked ? '❤' : '💦'}`}
        </Title>
        <>
          <Subtitle>
            {data?.movie?.language}
            {/* //11. button을 클릭하며 isFucked의 값이 바뀌면서 해당 값에 따라서 이모티콘이 다르게 나옴. */}
            {`${data?.movie?.rating} ${data?.movie?.isFucked ? '💘' : '💥'}`}
          </Subtitle>
          <Description>{data?.movie?.description_full}</Description>
        </>
      </Column>
      <Poster bg={data?.movie?.medium_cover_image}></Poster>
    </Container>
  );
};

export default Detail;
