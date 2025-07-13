import { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import EditIcon from "../../icons/EditIcon";
import { AscArrow, DescArrow, NonSortedIcon } from "../../icons/SortArrows";
import {
  deleteDocument,
  getAllDocuments,
} from "../../adapters/DocumentAdapter";
import { Link } from "react-router-dom";
import TrashIcon from "../../icons/TrashIcon";
import { usePopups } from "../../popup/PopupContext";
import InfoPopup from "../../popup/popups/InfoPopup";
import { useNavigate } from "react-router-dom";
import PageNumbers from "../../components/PageNumbers";

const AdminDocumentListPage = () => {
  const navigate = useNavigate();
  const { addPopup } = usePopups();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [documents, setDocuments] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [numebrOfElements, setNumberOfElements] = useState(0);

  const sortedData = useMemo(() => {
    const sorted = [...documents];
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];

        if (typeof aVal === "string") {
          return sortConfig.direction === "asc"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }

        return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
      });
    }

    return sorted;
  }, [sortConfig, documents]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const renderSortArrow = (key) => {
    var icon = undefined;
    if (sortConfig.key !== key) {
      icon = <NonSortedIcon height={15} />;
    } else if (sortConfig.direction === "asc") {
      icon = <AscArrow height={15} />;
    } else {
      icon = <DescArrow height={15} />;
    }

    return <SortIconContainer>{icon}</SortIconContainer>;
  };

  useEffect(() => {
    getDocuments();
  }, []);

  useEffect(() => {
    getDocuments();
  }, [currentPageNumber]);

  const getDocuments = () => {
    getAllDocuments(currentPageNumber).then((documentsPageData) => {
      setDocuments(documentsPageData.data);
      setNumberOfPages(documentsPageData.numberOfPages);
      setNumberOfElements(documentsPageData.numberOfElements);
    });
  };

  const onDocumentDelete = (documentId) => {
    addPopup((key, zIndex, closePopup) => (
      <InfoPopup
        key={key}
        zIndex={zIndex}
        closePopup={closePopup}
        onConfirm={() =>
          deleteDocument(documentId).then((res) => {
            if (res) {
              closePopup();
              setTimeout(() => navigate("/admin/documents"), 100);
            } else {
              setErrorMessage("Something went wrong. Please try later!");
            }
          })
        }
        title="Delete document"
        description="Are you sure you want to delete this document?"
        error={errorMessage}
      />
    ));
  };

  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <th style={{ minWidth: "25px" }}></th>
            <th style={{ minWidth: "25px" }}></th>
            <th
              style={{ width: "10%" }}
              onClick={() => handleSort("documentType")}
            >
              Type {renderSortArrow("documentType")}
            </th>
            <th
              style={{ width: "10%" }}
              onClick={() => handleSort("publishStatus")}
            >
              Status {renderSortArrow("publishStatus")}
            </th>
            <th style={{ width: "15%" }} onClick={() => handleSort("title")}>
              Title {renderSortArrow("title")}
            </th>
            <th
              style={{ width: "40%" }}
              onClick={() => handleSort("description")}
            >
              Description {renderSortArrow("description")}
            </th>
            <th
              style={{ width: "20%" }}
              onClick={() => handleSort("subDescription")}
            >
              Sub Description {renderSortArrow("subDescription")}
            </th>
            <th style={{ width: "12%" }} onClick={() => handleSort("created")}>
              Created At {renderSortArrow("created")}
            </th>
            <th
              style={{ width: "12%" }}
              onClick={() => handleSort("published")}
            >
              Published Date {renderSortArrow("published")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((data, index) => (
            <tr key={`${data.id}-${index}`}>
              <td className="hasHovorable">
                <HoverLabel className="hoverable">
                  Edit this news document in editor.
                </HoverLabel>
                <StyledLink to={"/admin?documentId=" + data.id}>
                  <EditIcon height={20} />
                </StyledLink>
              </td>
              <td className="hasHovorable">
                <HoverLabel className="hoverable">
                  Delete this document.
                </HoverLabel>
                <IconContainer onClick={() => onDocumentDelete(data.id)}>
                  <TrashIcon height={20} />
                </IconContainer>
              </td>
              <td>{data.documentType}</td>
              <td>{data.publishStatus}</td>
              <td>{data.title}</td>
              <td>{data.description}</td>
              <td>{data.subDescription}</td>
              <td>{data.createdAt}</td>
              <td>{data.publishDate}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <PageNumbers
        limitPageNumbers={5}
        currentPageNumber={currentPageNumber}
        totalPageNumbers={numberOfPages}
        onPageChange={setCurrentPageNumber}
      />
    </TableContainer>
  );
};

export default AdminDocumentListPage;

const TableContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
  position: relative;
  padding: 2rem;
`;

const StyledTable = styled.table`
  min-width: 700px;
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;

  thead {
    background-color: #f4f4f4;
    font-weight: bold;
  }

  th {
    user-select: none;
    font-size: ${(props) => props.theme.fonts.small};
    white-space: nowrap;
  }

  .hasHovorable {
    position: relative;
    &:hover .hoverable {
      visibility: visible;
    }
  }

  th,
  td {
    font-size: 0.8rem;
    border: 1px solid #ddd;
    padding: 0.25rem;
    text-align: center;
  }

  tbody tr:nth-child(even) {
    background-color: #fafafa;
  }

  tbody tr:hover {
    background-color: #f0f0f0;
  }
`;

const StyledLink = styled(Link)`
  display: block;
  width: 100%;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

const IconContainer = styled.div`
  width: 100%;
  height: 100%;

  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

const HoverLabel = styled.div`
  position: absolute;
  top: -15px;
  right: 5px;
  white-space: nowrap;

  transform: translateX(100%);

  padding: 0.2rem;
  border-radius: 5px;
  background-color: #bababa;
  font-size: ${(props) => props.theme.fonts.small};
  visibility: hidden;
  z-index: 1000;
`;

const SortIconContainer = styled.div`
  cursor: pointer;
  display: inline-block;
  transform: translateY(2px);
`;
