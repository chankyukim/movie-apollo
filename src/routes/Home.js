import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import Movie from '../components/Movie';

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  color: white;
  width: 100%;
  height: 45vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const SubTitle = styled.h3`
  font-size: 35px;
`;

const Loading = styled.div`
  font-size: 18px;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 10px;
`;

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 25px;
  width: 60%;
  position: relative;
  top: -50px;
`;

//쿼리에 varialbe이 없을 땐 이런식으로 써도 된다.
//2. isLiked,isFuck은 백엔드가 아닌 프론트(client)에 있다는걸 명시
const GET_MOVIES = gql`
  {
    movies {
      id
      medium_cover_image
      isLiked @client
      isFucked @client
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_MOVIES);
  // console.log(loading, error, data);
  return (
    <Container>
      <Header>
        <Title>Apollo 2021</Title>
        <SubTitle>I love GraphQL</SubTitle>
      </Header>
      {loading && <Loading>Loading...</Loading>}
      <Movies>
        {data?.movies?.map(movie => (
          <Movie
            key={movie.id}
            isLiked={movie.isLiked}
            id={movie.id}
            bg={movie.medium_cover_image}
            isFucked={movie.isFucked} //3. props로 전달
          />
        ))}
      </Movies>
    </Container>
  );
};

export default Home;
