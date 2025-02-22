import styled from 'styled-components';

export const Header = styled.header`
  background-color: #fff;
  border-bottom: 1px solid var(--border-gray);
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  nav {
    display: flex;
    gap: 24px;
    align-items: center;

    a {
      color: var(--text-dark);
      font-weight: 600;
      font-size: 14px;
      letter-spacing: 0.5px;
    }
  }
`;

export const Logo = styled.div`
  color: var(--primary-blue);
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.5px;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 24px auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const MainContent = styled.main`
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const Sidebar = styled.aside`
  @media (max-width: 1024px) {
    display: none;
  }
`;

export const MovieHeader = styled.div`
  display: grid;
  grid-template-columns: 230px 1fr;
  gap: 40px;
  margin-bottom: 48px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const PosterContainer = styled.div`
  position: relative;
  width: 230px;
  height: 345px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background-color: var(--primary-blue);

  @media (max-width: 768px) {
    margin: 0 auto;
  }
`;

export const PosterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const MovieInfo = styled.div`
  flex: 1;
`;

export const MovieTitle = styled.h1`
  font-size: 36px;
  margin: 0 0 16px 0;
  color: var(--text-dark);
  letter-spacing: -0.5px;
  line-height: 1.2;
`;

export const MovieMeta = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  color: var(--text-gray);
  font-size: 15px;
  align-items: center;

  span {
    display: flex;
    align-items: center;
  }

  span:not(:last-child)::after {
    content: "•";
    margin-left: 20px;
    opacity: 0.5;
  }
`;

export const MovieDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-gray);
  margin-bottom: 24px;
`;

export const ShowtimesSection = styled.div`
  margin-top: 40px;
  border-top: 1px solid var(--border-gray);
  padding-top: 32px;
`;

export const TheaterInfo = styled.div`
  margin-bottom: 32px;
  background: var(--background-light);
  padding: 24px;
  border-radius: 12px;
`;

export const TheaterName = styled.h2`
  font-size: 24px;
  margin: 0 0 8px 0;
  color: var(--text-dark);
`;

export const TheaterAddress = styled.p`
  color: var(--text-gray);
  margin: 0;
  font-size: 14px;
`;

export const FormatGroup = styled.div`
  width: 100%;
  margin-bottom: 40px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const FormatTitle = styled.h3`
  font-size: 18px;
  color: var(--text-dark);
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-gray);
  display: flex;
  align-items: center;
`;

export const ShowtimesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 16px;
`;

export const ShowtimeButton = styled.button`
  width: 100%;
  background-color: #fff;
  border: 1px solid var(--primary-blue);
  color: var(--primary-blue);
  padding: 12px 8px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  &:hover {
    background-color: var(--primary-blue);
    color: #fff;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(13, 83, 246, 0.2);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(13, 83, 246, 0.2);
  }
`;

export const PriceTag = styled.span`
  font-size: 14px;
  color: inherit;
  opacity: 0.9;
  font-weight: 500;
`;

export const AdPlaceholder = styled.div`
  width: 100%;
  height: 250px;
  background: #f5f5f5;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-gray);
  font-size: 14px;
  margin-bottom: 24px;
  border: 1px dashed var(--border-gray);
`;

export const Footer = styled.footer`
  background: #fff;
  border-top: 1px solid var(--border-gray);
  padding: 40px 0;
  margin-top: 60px;
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  color: var(--text-gray);
  font-size: 14px;
  text-align: center;

  p {
    margin: 8px 0;
  }
`;
