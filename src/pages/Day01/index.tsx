import FizzBuzzUI from '@/components/FizzBuzz'
import CounterUI from '@/components/Counter'
import { PageLayout } from '@/design-system/layout/PageLayout'
import styled from 'styled-components'

const Spacer = styled.div`
  height: ${({ theme }) => theme.spacing['2xl']};
`;

const Day01 = () => {
  return (
    <PageLayout 
      title="FizzBuzz & Counter" 
      description="Our very first React components."
    >
      <FizzBuzzUI />
      <Spacer />
      <CounterUI />
    </PageLayout>
  )
}

export default Day01

