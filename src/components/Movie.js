import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { gql, useMutation, useQuery } from '@apollo/client';

//5.mutation 작성(mutation이 @client에 있다고 명시해주어야한다. 이 mutation을 백엔드로 보내면 안되기 때문에)
const FUCK_MOVIE = gql`
  mutation toggleFuck($id: Int!, $isFucked: Boolean!) {
    toggleFuck(id: $id, isFucked: $isFucked) @client
  }
`;

const LIKE_MOVIE = gql`
  mutation toggleLikeMovie($id: Int!, $isLiked: Boolean!) {
    toggleLikeMovie(id: $id, isLiked: $isLiked) @client
  }
`;

const Container = styled.div`
  width: 100%;
  height: 380px;
`;

const Poster = styled.div`
  background-image: url(${props => props.bg});
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
`;

const Movie = ({ id, bg, isLiked, isFucked }) => {
  const [toggleMovie] = useMutation(LIKE_MOVIE, {
    variables: {
      id: parseInt(id),
      isLiked,
    },
  });

  //6. useMutation사용. 배열의 첫번째 요소는 mutation이고, 이름은 아무거나 지어도 된다. play가 실행되고 apollo.js에 있는 toggleFuck이 동작한다.
  const [play] = useMutation(FUCK_MOVIE, {
    variables: {
      id: +id,
    },
  });
  return (
    <Container>
      <Link to={`/${id}`}>
        <Poster bg={bg} />
      </Link>
      <button onClick={toggleMovie}>{isLiked ? 'unLike' : 'Like'}</button>

      {/* //7.onClick을 통해 클릭하면 toggle이 되게 한다 */}
      <button onClick={play}>{isFucked ? 'noFuck' : 'isFuck'}</button>
    </Container>
  );
};

export default Movie;
