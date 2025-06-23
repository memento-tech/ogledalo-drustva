import { useState, useMemo } from "react";
import styled from "styled-components";
import AdminPageTemplate from "./AdminPageTemplate";
import EditIcon from "../../icons/EditIcon";
import { AscArrow, DescArrow, NonSortedIcon } from "../../icons/SortArrows";

// Sample data...
const newsData = [
  {
    id: 1,
    category: "Top Category",
    title: "This is one title",
    description: "Lorem ipsum dolor sit amet.",
    published: "12/04/2024",
    created: "11/04/2024",
  },
  {
    id: 2,
    category: "Second",
    title: "Another title",
    description: "A different description.",
    published: "15/04/2024",
    created: "10/04/2024",
  },
];

const AdminNewsListPage = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const sortedData = useMemo(() => {
    const sorted = [...newsData];
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
  }, [sortConfig]);

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

  return (
    <AdminPageTemplate>
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <th style={{ width: "5%" }}></th>
              <th style={{ width: "7%" }} onClick={() => handleSort("id")}>
                ID {renderSortArrow("id")}
              </th>
              <th
                style={{ width: "10%" }}
                onClick={() => handleSort("category")}
              >
                Category {renderSortArrow("category")}
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
                style={{ width: "12%" }}
                onClick={() => handleSort("created")}
              >
                Created {renderSortArrow("created")}
              </th>
              <th
                style={{ width: "12%" }}
                onClick={() => handleSort("published")}
              >
                Published {renderSortArrow("published")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((data, index) => (
              <tr key={`${data.id}-${index}`}>
                <td>
                  <HoverLabel className="hoverable">
                    Edit this news document in editor.
                  </HoverLabel>
                  <EditIcon height={20} />
                </td>
                <td>{data.id}</td>
                <td>{data.category}</td>
                <td>{data.title}</td>
                <td>{data.description}</td>
                <td>{data.created}</td>
                <td>{data.published}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
    </AdminPageTemplate>
  );
};

export default AdminNewsListPage;

const TableContainer = styled.div`
  width: 100%;
  margin-top: 2rem;
  padding-bottom: 2rem;
  display: flex;
  justify-content: center;
`;

const StyledTable = styled.table`
  width: 95%;
  border-collapse: collapse;
  font-size: 0.95rem;
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  thead {
    background-color: #f4f4f4;
    font-weight: bold;
  }

  th {
    user-select: none;
    font-size: ${(props) => props.theme.fonts.small};
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 0.75rem;
    text-align: center;

    &:first-child {
      position: relative;
      cursor: pointer;
      padding: 0.2rem;

      &:hover .hoverable {
        visibility: visible;
      }
    }
  }

  tbody tr:nth-child(even) {
    background-color: #fafafa;
  }

  tbody tr:hover {
    background-color: #f0f0f0;
  }
`;

const HoverLabel = styled.div`
  position: absolute;
  top: -10px;
  right: 10px;
  white-space: nowrap;

  transform: translateX(100%);

  padding: 0.2rem;
  border-radius: 5px;
  background-color: #b5b5b5;
  font-size: ${(props) => props.theme.fonts.small};
  visibility: hidden;
`;

const SortIconContainer = styled.div`
  cursor: pointer;
  display: inline-block;
  transform: translateY(2px);
`;
