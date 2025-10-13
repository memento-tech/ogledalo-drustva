import styled from "styled-components";
import {
  FirstPageArrow,
  LastPageArrow,
  NextPageArrow,
  PreviousPageArrow,
} from "../icons/PageIcons";

const PageNumbers = ({
  currentPageNumber = 13,
  totalPageNumbers = 15,
  limitPageNumbers = 5,
  onPageChange,
}) => {

  if (totalPageNumbers === 0) {
    return <></>;
  }

  const visibleLimit = limitPageNumbers;

  const half = Math.floor(visibleLimit / 2);

  let start = currentPageNumber - half;
  let end = currentPageNumber + half;

  if (start < 1) {
    start = 1;
    end = visibleLimit;
  }
  if (end > totalPageNumbers) {
    end = totalPageNumbers;
    start = totalPageNumbers - visibleLimit + 1;
  }
  if (start < 1) start = 1;

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  const showLeftDots = start > 2;
  const showRightDots = end < totalPageNumbers - 1;

  if (totalPageNumbers === 0 || totalPageNumbers === 1) {
    return <></>;
  }

  return (
    <Container>
      <IconContainer
        onClick={() => onPageChange(1)}
        className={showLeftDots ? "" : "hidden"}
      >
        <FirstPageArrow height={20} />
      </IconContainer>
      <IconContainer
        onClick={() => onPageChange(currentPageNumber - 1)}
        className={currentPageNumber === 1 ? "hidden" : ""}
      >
        <PreviousPageArrow height={20} />
      </IconContainer>

      {start > 1 && (
        <PageNumber
          className={currentPageNumber === 1 ? "active" : ""}
          onClick={() => onPageChange(1)}
        >
          1
        </PageNumber>
      )}

      {showLeftDots && <SimpleDots>. . .</SimpleDots>}

      {pages.map((page) => {
        if (
          (page === 1 && start > 1) ||
          (page === totalPageNumbers && end < totalPageNumbers)
        )
          return null;
        return (
          <PageNumber
            key={page}
            className={currentPageNumber === page ? "active" : ""}
            onClick={() => onPageChange(page)}
          >
            {page}
          </PageNumber>
        );
      })}

      {showRightDots && <SimpleDots>. . .</SimpleDots>}

      {end < totalPageNumbers && (
        <PageNumber
          className={currentPageNumber === totalPageNumbers ? "active" : ""}
          onClick={() => onPageChange(totalPageNumbers)}
        >
          {totalPageNumbers}
        </PageNumber>
      )}

      <IconContainer
        onClick={() => onPageChange(currentPageNumber + 1)}
        className={currentPageNumber === totalPageNumbers ? "hidden" : ""}
      >
        <NextPageArrow height={20} />
      </IconContainer>
      <IconContainer
        onClick={() => onPageChange(totalPageNumbers)}
        className={showRightDots ? "" : "hidden"}
      >
        <LastPageArrow height={20} />
      </IconContainer>
    </Container>
  );
};

export default PageNumbers;

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 5px;

  .active {
    border: 1px solid black;
    border-radius: 50%;

    cursor: default;
    &:hover {
      transform: scale(1);
    }
  }

  .hidden {
    visibility: hidden;
  }
`;

const IconContainer = styled.div`
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
  height: 20px;
`;

const PageNumber = styled.div`
  margin: 0;
  width: 20px;
  height: 20px;
  text-align: center;

  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

const SimpleDots = styled.p`
  margin: 0;
  height: 20px;
  text-align: center;
`;
