import Header from '@/components/layout.js/Header';
import Link from 'next/link';
import styled from 'styled-components';

export default function NotFound() {
  return (
    <Wrapper>
      <Header />
      <h1>Not found – 404!</h1>
      <div className='go_gack_home'>
        <Link href="/">Go back to Home</Link>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
h1{
  font-size: 3rem;
  text-align: center;
  font-weight: 600;
  margin-top:3rem;
}
.go_gack_home{
  padding: 1rem 2rem;
  margin: 0 auto;
  text-align: center;
  background-color: var(--primary-color);
  max-width: 250px;
  margin-top:3rem;
  border-radius: 30px;
  margin-bottom:3rem;
  a{
    font-size: 2.5rem;
    color: #fff;
  }
}
`;