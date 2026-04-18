import FizzBuzzUI from '@/components/FizzBuzz'
import CounterUI from '@/components/Counter'
import { PageLayout } from '@/design-system/layout/PageLayout'

const Day01 = () => {
  return (
    <PageLayout 
      title="FizzBuzz & Counter" 
      description="Our very first React components."
    >
      <FizzBuzzUI />
      <section id="spacer" style={{ height: '50px' }}></section>
      <CounterUI />
    </PageLayout>
  )
}

export default Day01
