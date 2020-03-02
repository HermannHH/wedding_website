import React, { useState, useEffect } from 'react';
import ReactDataGrid from 'react-data-grid';
import axios from 'axios';

import 'react-data-grid/dist/react-data-grid.css';

const columns = [
  { key: 'full_name', name: 'Name', frozen: true, width: 190, resizable: true  },
  { key: 'actions', name: 'Actions', frozen: true, width: 80, resizable: true  },
  { key: 'group_name', name: 'Group Name', editable: true, resizable: true},
  { key: 'first_name', name: 'First Name', editable: true, resizable: true},
  { key: 'last_name', name: 'Last Name', editable: true, resizable: true},
  { key: 'email', name: 'Email', editable: true, resizable: true },
  { key: 'parsed_phone_number', name: 'Phone #', editable: true, resizable: true },
  { key: 'dietary_preference', name: 'Dietary Preference', editable: true, resizable: true }
];

function ShareOnWhatsAppLink() {

  return (
    <a>Share on WhatsApp</a>
  )
}
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
      console.log(resp.data)
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


  async function handleOnGridRowsUpdated(value) {
    try {
      const slicedRows = rows.slice();
      for (let i = value.fromRow; i <= value.toRow; i++) {
        slicedRows[i] = { ...slicedRows[i], ...value.updated };
      }
      setRows(slicedRows)
      const resp = await axios.patch(`/api/v1/groups/members/${value.toRowId}`, {
        member: {
          ...value.updated
        }
      });
      setToast('success', 'Change saved')
    } catch (error) {
      console.log('error', error);
      setToast('error', 'Something went wrong on our side')
    }
  };

  if(isLoading) { return <h1>Loading Data...</h1>};

  const actions = [
    {
      icon: <i className="fas fa-copy"></i>,
      callback: () => {
        alert("Copy");
      },
    },
    {
      icon: <i className="fab fa-whatsapp"></i>,
      callback: () => {
        alert("Sending whatsapp");
      }
    },
  ];

  function getCellActions(column, row) {
    const cellActions = {
      actions: actions
    };
    return cellActions[column.key];
  }


  const CustomRowRenderer = ({renderBaseRow, ...canvasProps}) => {
    const { row, ...rest } = canvasProps;
    return renderBaseRow({row: {
      actions: "",
      group_name: row.group.name,
      full_name: row.full_name,
      first_name: row.first_name,
      last_name: row.last_name,
      email: row.email,
      parsed_phone_number: row.parsed_phone_number,
      dietary_preference: row.dietary_preference
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
