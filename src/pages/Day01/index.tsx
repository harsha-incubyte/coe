import FizzBuzzUI from '@/components/FizzBuzz'
import CounterUI from '@/components/Counter'

const Day01 = () => {
  return (
    <div>
      <h1>FizzBuzz & Counter</h1>
      <FizzBuzzUI />
      <section id="spacer" style={{ height: '50px' }}></section>
      <CounterUI />
    </div>
  )
}

export default Day01
