import React, { useEffect, useState } from 'react';
// import DataTable from 'react-data-table-component';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { Button, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from 'reactstrap';

import API_URL from '../../config';

const Vehicles = (props) => {

    const getVehicles = async () => {
        try {
          const response = await fetch(`${API_URL}/api/vehicles/`, {
            method: "GET",
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error("Error during authentication:", error);
        }
      };

      useEffect(() => {
        getVehicles();
    }, []);

    return (
        <div id="agentsList">
            {/* <Row className="g-4 mb-3">
                 <Col className="col-sm">
                    <div className="d-flex justify-content-sm-end">
                        <div className="search-box ms-2">
                            <input type="text" className="form-control search" placeholder="Search..." />
                            <i className="ri-search-line search-icon"></i>
                        </div>
                    </div>
                </Col> 
            </Row> */}

            {/* <DataTable
                columns={columns}
                pagination
                paginationServer
                fixedHeader
                data={agents}
                paginationRowsPerPageOptions={[10, 20, 30, 40, 50, 100]}
                paginationPerPage={10}
                paginationTotalRows={count}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                onChangePage={handleChangePage}
                progressPending={pending}
                noDataComponent={t("pages.data-table.noDataComponent.no-data")}
                
            /> */}
        </div>
    );
};

export default Vehicles;
