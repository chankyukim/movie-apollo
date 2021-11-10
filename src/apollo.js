import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache({
    typePolicies: {
      Movie: {
        fields: {
          isLiked: {
            merge(existing, incoming) {
              if (existing) {
                return existing;
              } else {
                return incoming;
              }
            },
          },
          //9. 캐시 전에 isFucked의 값이 일치하지 않는 문제를 해결
          isFucked: {
            merge(existing, incoming) {
              if (existing) {
                return existing;
              } else {
                return incoming;
              }
            },
          },
        },
      },
    },
  }),

  resolvers: {
    //api에서 넘어오는 data의 이름과 같아야한다.
    Movie: {
      isLiked: () => false, //Movie의 필드에 isLiked 추가, default값으로 false값
      isFucked: () => false, //1. Movie 필드에 isFuck추가, default값으로 false 설정
    },

    //4.mutation 생성, toggleLikeMovie,toggleFuck함수 생성(resolver)
    Mutation: {
      toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
        //8. cache에 저장된 데이터를 사용자가 원하는 데이터로 수정할 수 있다.
        cache.modify({
          id: `Movie:${id}`,
          fields: {
            isLiked: isLiked => !isLiked, //현재 isLiked 값을 받아서 true-false 토글
            // medium_cover_image: () => 'lalaala',//이런식으로 받아온 data의 값을 바꿀 수 있다.
          },
        });
      },

      toggleFuck: (_, { id, isFucked }, { cache }) => {
        //8. cache에 저장된 데이터를 사용자가 원하는 데이터로 수정할 수 있다. (isFucked가 true,false로 toggle).
        //Movie:${id} -> 해당하는 번호의 Movie의 isFucked요소만 true,false로 번갈아가며 토글된다
        cache.modify({
          id: `Movie:${id}`,
          fields: {
            isFucked: isFucked => !isFucked, //현재 isLiked 값을 받아서 true-false 토글
            // medium_cover_image: () => 'lalaala',//이런식으로 받아온 data의 값을 바꿀 수 있다.
          },
        });
      },
    },
  },
});

export default client;
