// Importing Libraries
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import userCan from '../../config/user_can';
import AuthContext from "../../context/auth/authContext";


function Sidebar({ page }) {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const [roles, setRoles] = useState([]);

  let urlEmpty = '';
  // Function Logout

  return (
    <React.Fragment>
      <div className="niceadmin">
        <aside id="sidebar" className="sidebar">

          <ul className="sidebar-nav" id="sidebar-nav">

            <li className="nav-item">
              <Link className="nav-link " to="/">
                <i className="bi bi-house-door"></i>
                <span>Dashboard</span>
              </Link>
            </li>



            <li className="nav-item">
              <a className="nav-link collapsed" data-bs-target="#customer-management-nav" data-bs-toggle="collapse" href="#">
                <i className="bi bi-people"></i><span>Customers</span><i className="bi bi-chevron-down ms-auto"></i>
              </a>
              <ul id="customer-management-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                <li>
                  <a href="/otogas/customers">
                    <i className="bi bi-people-fill fs-5"></i><span> Customers</span>
                  </a>
                </li>
                <li>
                  <a href="/otogas/customers/balances">
                    <i className="bi bi-wallet-fill fs-5"></i><span>Wallets</span>
                  </a>
                </li>
                <li>
                  <a href="/otogas/vehicles">
                    <i className="bi bi-truck-flatbed fs-5"></i><span>Vehicles</span>
                  </a>
                </li>
              </ul>
            </li>

            {/* <li className="nav-item">
              <a className="nav-link collapsed" data-bs-target="#stations-nav" data-bs-toggle="collapse" href="#">
                <i className="bi bi-building"></i><span>Stations</span><i className="bi bi-chevron-down ms-auto"></i>
              </a>
              <ul id="stations-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                <li>
                  <a href="/otogas/stations">
                    <i className="bi bi-shop-window fs-5"></i><span> Stations</span>
                  </a>
                </li>
                <li>
                  <a href="/otogas/totalizers">
                    <i className="bi bi-pie-chart-fill fs-5"></i><span>Totalizers</span>
                  </a>
                </li>
              </ul>
            </li> */}

            <li className="nav-item">
              <a className="nav-link collapsed" data-bs-target="#stations-nav" data-bs-toggle="collapse" href="#">
                <i className="bi bi-building"></i><span>Stations</span><i className="bi bi-chevron-down ms-auto"></i>
              </a>
              <ul id="stations-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                {userCan(user, "GET:Station:GetAllStations") &&
                  <li>
                    <a href="/otogas/stations">
                      <i className="bi bi-shop-window fs-5"></i><span> Stations</span>
                    </a>
                  </li>
                }
                {userCan(user, "GET:Station:GetAllStations") &&
                  <li>
                    <a href="/otogas/totalizers">
                      <i className="bi bi-pie-chart-fill fs-5"></i><span>Totalizers</span>
                    </a>
                  </li>
                }
              </ul>
            </li>

            <li className="nav-item">
              <a className="nav-link collapsed" data-bs-target="#sales-nav" data-bs-toggle="collapse" href="#">
                <i className="bi bi-currency-exchange"></i><span>Sales</span><i className="bi bi-chevron-down ms-auto"></i>
              </a>
              <ul id="sales-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                {userCan(user, "GET:Sales:AllSales") &&
                  <li>
                    <a href="/otogas/sales">
                      <i className="bi bi-cart-check-fill fs-5"></i><span> Transactions</span>
                    </a>
                  </li>
                }
                {userCan(user, "GET:Stock:AllVariances") &&
                  <li>
                    <a href="/otogas/variances">
                      <i className="bi bi-bar-chart-fill fs-5"></i><span>Variances</span>
                    </a>
                  </li>
                }
                <li>
                  <a href="/otogas/pos">
                    <i className="bi bi-credit-card-fill fs-5"></i><span>POS</span>
                  </a>
                </li>

                <li>
                  <a href="/otogas/pos-sales">
                    <i className="bi bi-credit-card-fill fs-5"></i><span>POS Sales</span>
                  </a>
                </li>
              </ul>
            </li>



            <li className="nav-item">
              <a className="nav-link collapsed" data-bs-target="#finance-nav" data-bs-toggle="collapse" href="#">
                <i className="bi bi-cash-coin"></i><span>Finance</span><i className="bi bi-chevron-down ms-auto"></i>
              </a>
              <ul id="finance-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                {userCan(user, "GET:Payments:GetAllTills") &&
                  <li>
                    <a href="/otogas/tills">
                      <i className="bi bi-box-seam fs-5"></i><span>Tills</span>
                    </a>
                  </li>
                }
                {userCan(user, "GET:Payments:MpesaTransactions") &&
                  <li>
                    <a href="/otogas/mpesa-payments">
                      <i className="bi bi-phone-vibrate-fill fs-5"></i><span>Mpesa Payments</span>
                    </a>
                  </li>
                }
              </ul>
            </li>


            <li className="nav-item">
              <a className="nav-link collapsed" data-bs-target="#settings-nav" data-bs-toggle="collapse" href="#">
                <i className="bi bi-gear"></i><span>Settings</span><i className="bi bi-chevron-down ms-auto"></i>
              </a>
              <ul id="settings-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                <li>
                  <a href="/otogas/settings">
                    <i className="bi bi-gear fs-5"></i><span>Settings</span>
                  </a>
                </li>
                <li>
                  <a href="/otogas/reports">
                    <i className="bi bi-file-earmark-text fs-5"></i><span>Reports</span>
                  </a>
                </li>
              </ul>
            </li>


            <li className="nav-item">
              <a className="nav-link collapsed" data-bs-target="#messagging-nav" data-bs-toggle="collapse" href="#">
                <i className="bi bi-chat-dots fs-5"></i><span>Messaging</span><i className="bi bi-chevron-down ms-auto"></i>
              </a>
              <ul id="messagging-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                <li>
                  <a href="/otogas/messaging">
                    <i className="bi bi-chat-dots fs-5"></i><span>Messages</span>
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a className="nav-link collapsed" data-bs-target="#staff-management-nav" data-bs-toggle="collapse" href="#">
                <i className="bi bi-people"></i><span>Staff Management</span><i className="bi bi-chevron-down ms-auto"></i>
              </a>
              <ul id="staff-management-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">

                {
                  userCan(user, "GET:Authentication:GetAllUsers") &&
                  <li>
                    <a href="/otogas/users">
                      <i className="bi bi-person-square fs-5"></i><span> Users</span>
                    </a>
                  </li>
                }
                {/* <a href="/otogas/users">
                    <i className="bi bi-person-square fs-5"></i><span> Users</span>
                  </a> */}
                {
                  userCan(user, "GET:UserRoles:GetUserRoles") &&
                  <li>
                    <a href="/users/roles">
                      <i className="bi bi-shield-lock-fill fs-5"></i><span>Roles</span>
                    </a>
                  </li>
                }
                <li>
                  <a href="/users/profile">
                    <i className="bi bi-person-circle fs-5"></i><span>Profile</span>
                  </a>
                </li>
              </ul>
            </li>



            <li className="nav-item">
              <a className="nav-link collapsed" data-bs-target="#deliveries-nav" data-bs-toggle="collapse" href="#">
                <i className="bi bi-truck"></i><span>Bulk Deliveries</span><i className="bi bi-chevron-down ms-auto"></i>
              </a>
              <ul id="deliveries-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                <li>
                  <a href="/otogas/bulk-orders">
                    <i className="bi bi-card-checklist"></i><span>Bulk Deliveries</span>
                  </a>
                </li>
                <li>
                  <a href="/otogas/bulk-orders/create">
                    <i className="bi bi-plus-circle"></i><span>Create Order</span>
                  </a>
                </li>
              </ul>
            </li>

                  <li className="nav-item">
              <a className="nav-link collapsed" data-bs-target="#distributor-nav" data-bs-toggle="collapse" href="#">
                <i className="bi bi-truck"></i><span>Distributorship</span><i className="bi bi-chevron-down ms-auto"></i>
              </a>
              <ul id="distributor-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                <li>
                  <a href="/list-retailers">
                    <i className="bi bi-card-checklist"></i><span>Retailers</span>
                  </a>
                </li>
                <li>
                  <a href="/otogas/bulk-orders/create">
                    <i className="bi bi-plus-circle"></i><span>Create Order</span>
                  </a>
                </li>
              </ul>
            </li>



          </ul>
        </aside>
      </div>
    </React.Fragment>
  );
}

export default Sidebar;
