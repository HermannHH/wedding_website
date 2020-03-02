import React, { useState, useEffect } from 'react';
import ReactDataGrid from 'react-data-grid';
import axios from 'axios';

import 'react-data-grid/dist/react-data-grid.css';


const StatusFormatter = (data) => {
  return (
    <span
      className={`text-sm font-medium py-1 px-2 rounded align-middle
        ${data.value == "Accepted" && 'text-green-500 bg-green-100'}
        ${data.value == "Rejected" && 'text-red-500 bg-red-100'}
        ${data.value == "Pending" && 'text-blue-500 bg-blue-100'}
      `}
  >{data.value}</span>
  );
};


const ShareWhatsapp = () => {
  return <span onClick={() => alert('ok')} className="fab fa-whatsapp ghost-button">Share</span>
};

const columns = [
  { key: 'actions', name: 'Actions', frozen: true, width: 80, resizable: true },
  { key: 'group_name', name: 'Group Name', editable: false, resizable: true},
  { key: 'attendance_status', name: 'Status', resizable: true, formatter: StatusFormatter },
  { key: 'first_name', name: 'First Name', editable: true, resizable: true},
  { key: 'last_name', name: 'Last Name', editable: true, resizable: true},
  { key: 'email', name: 'Email', editable: true, resizable: true },
  { key: 'parsed_phone_number', name: 'Phone #', editable: true, resizable: true },
  { key: 'dietary_preference', name: 'Dietary Preference', editable: true, resizable: true }

  // { key: 'token', name: 'Token', resizable: true  },
];

function MemberManager() {
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);

  function setToast(type, message) {
    var el = document.createElement('div');
    el.style.cssText = 'display:hidden;';
    el.setAttribute('data-notyf-type', type);
    el.setAttribute('data-notyf-message', message);
    el.setAttribute('data-controller', 'notyf');
    document.body.appendChild(el);
  }

  async function handleMemberList() {
    try {
      const resp = await axios.get('/api/v1/groups/members');
      setRows(resp.data);
      setIsLoading(false);
    } catch (error) {
      console.log('error', error);
      setToast('error', 'Something went wrong on our side')
    }
  }

  useEffect(() => {
    handleMemberList();
  }, []);

  function updateRowState({ fromRow, toRow, updated }) {
    const slicedRows = rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        slicedRows[i] = { ...slicedRows[i], ...updated };
      }
      setRows(slicedRows)
  }


  async function handleOnGridRowsUpdated(value) {
    try {
      updateRowState({ fromRow: value.fromRow, toRow: value.toRow, updated: value.updated })
      const resp = await axios.patch(`/api/v1/groups/members/${value.toRowId}`, {
        member: {
          ...value.updated
        }
      });
      updateRowState({ fromRow: value.fromRow, toRow: value.toRow, updated: resp.data })
      setToast('success', 'Change saved')
    } catch (error) {
      console.log('error', error);
      setToast('error', 'Something went wrong on our side')
    }
  };

  if(isLoading) { return <h1>Loading Data...</h1>};

  function copyToClipboard(str) {
    const el = document.createElement('textarea');
    // el.classList.add('hidden');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  function actions(column, row) {
    return [
        {
          icon: <i className="fas fa-copy cursor-pointer"></i>,
          callback: () => {
            copyToClipboard(row.personal_url);
            setToast('success', 'Copied')
          },
        },
        {
          icon: <i className="fab fa-whatsapp cursor-pointer"></i>,
          callback: () => {
            window.open(row.whatsapp_url, '_blank')
          }
        },
      ];
  }

  function getCellActions(column, row) {
    const cellActions = {
      actions: actions(column, row)
    };
    return cellActions[column.key];
  }


  const CustomRowRenderer = ({renderBaseRow, ...canvasProps}) => {
    const { row, ...rest } = canvasProps;
    // console.log('rest', rest)
    return renderBaseRow({row: {
      actions: null,
      attendance_status: row.attendance_status,
      group_name: row.group.name,
      first_name: row.first_name,
      last_name: row.last_name,
      email: row.email,
      parsed_phone_number: row.parsed_phone_number,
      dietary_preference: row.dietary_preference,
      token: row.token,
      personal_url: row.personal_url,
      whatsapp_url: row.whatsapp_url
    }, ...rest});
   }

  return (
    <ReactDataGrid
      columns={columns}
      rowGetter={i => rows[i]}
      enableCellSelect={true}
      rowsCount={rows.length}
      onGridRowsUpdated={handleOnGridRowsUpdated}
      minHeight={document.documentElement.clientHeight - 82}
      rowKey="token"
      rowRenderer={CustomRowRenderer}
      getCellActions={getCellActions}
    />
  );
}

export default MemberManager;
