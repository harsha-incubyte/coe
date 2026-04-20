import React from 'react';
import { CardHeader } from '@/design-system/molecules/CardHeader';
import * as S from './ArticleCard.styles';

interface ArticleCardProps {
  title: string;
  date: string;
  content: string;
}

const ArticleCardGood: React.FC<ArticleCardProps> = ({ title, date, content }) => {
  return (
    <S.StyledArticleCard>
      <S.HeaderWrapper>
        <CardHeader 
          title={title} 
          subtitle={<S.DateText dateTime={date}>{date}</S.DateText>}
          titleLevel={2}
        />
      </S.HeaderWrapper>
      <S.CardContent>
        <p>{content}</p>
      </S.CardContent>
      <S.CardFooter>
        <S.ReadMoreButton href="#">
          Read More
        </S.ReadMoreButton>
      </S.CardFooter>
    </S.StyledArticleCard>
  );
};


export default ArticleCardGood;
