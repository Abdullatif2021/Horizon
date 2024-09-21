import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CollapsibleTable = () => {
  const [data, setData] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const body = {
          project_id: 'aBjuSQpEPKeu45Mn7hQVgX',
          token: 'bb62e0ec2c8eaaaa2e760fd2c2723f0d5e7d7eb3',
        };
        const response = await axios.post(
          'https://ics.pythonanywhere.com/api/fetch-data/',
          body
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  // Utility function to replace underscores with spaces
  const formatKey = (key) => key.replace(/_/g, ' ');

  return (
    <div>
      <table
        style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
        <thead>
          <tr
            style={{
              backgroundColor: '#f2f2f2',
              borderBottom: '1px solid #ddd',
            }}>
            <th style={{ padding: '10px' }}>Employee Name</th>
            <th style={{ padding: '10px' }}>Consent</th>
            <th style={{ padding: '10px' }}>Start Time</th>
            <th style={{ padding: '10px' }}>End Time</th>
            <th style={{ padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <React.Fragment key={entry._id}>
              <tr
                onClick={() => toggleRow(index)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: expandedRow === index ? '#e6f7ff' : '#fff',
                  borderBottom: '1px solid #ddd',
                }}>
                <td style={{ padding: '10px' }}>
                  {entry.name_employee || 'N/A'}
                </td>
                <td style={{ padding: '10px' }}>{entry.consent || 'N/A'}</td>
                <td style={{ padding: '10px' }}>{entry.start || 'N/A'}</td>
                <td style={{ padding: '10px' }}>{entry.end || 'N/A'}</td>
                <td style={{ padding: '10px' }}>
                  {expandedRow === index ? 'Collapse' : 'Expand'}
                </td>
              </tr>

              {expandedRow === index && (
                <tr>
                  <td
                    colSpan='5'
                    style={{ padding: '10px', backgroundColor: '#f9f9f9' }}>
                    {/* Render all key-value pairs in a grid */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns:
                          'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: '10px',
                      }}>
                      {Object.keys(entry).map((key) => (
                        <div
                          key={key}
                          style={{
                            padding: '10px',
                            border: '1px solid #ddd',
                            backgroundColor: '#fff',
                            borderRadius: '4px',
                          }}>
                          <strong>{formatKey(key)}:</strong>{' '}
                          {JSON.stringify(entry[key]) || 'N/A'}
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CollapsibleTable;
