import React from 'react';
import * as S from './ArticleCard.styles';

interface ArticleCardProps {
  title: string;
  date: string;
  content: string;
}

const ArticleCardBad: React.FC<ArticleCardProps> = ({ title, date, content }) => {
  return (
    <S.NonSemanticCard>
      <S.NonSemanticHeader>
        <S.NonSemanticTitle>{title}</S.NonSemanticTitle>
        <S.NonSemanticDate>{date}</S.NonSemanticDate>
      </S.NonSemanticHeader>
      <S.NonSemanticContent>
        <p>{content}</p>
      </S.NonSemanticContent>
      <S.NonSemanticFooter>
        <S.NonSemanticBtn onClick={() => window.location.href = '#'}>
          Read More
        </S.NonSemanticBtn>
      </S.NonSemanticFooter>
    </S.NonSemanticCard>
  );
};

export default ArticleCardBad;

