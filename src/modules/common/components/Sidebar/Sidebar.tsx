import React from 'react';
import './Sidebar.scss';
import SidebarItem from './components/sideBarItem/SidebarItem';

interface Props {
  expand: boolean;
  onChangeSidebarExpand: Function;
}
const style = {
  backgroundColor: 'transparent',
  color: 'white',
};
const catalogList = [
  {
    name: 'Catalog',
    icon: <i className="bx bxs-purchase-tag"></i>,
    listItem: [
      {
        to: '/pages/products/manage-product',
        name: 'Products',
      },
    ],
  },
  {
    name: 'User',
    icon: <i className="bx bx-user"></i>,
    listItem: [
      {
        to: '/pages/user/manage-user',
        name: 'User list',
      },
    ],
  },
];
const Sidebar = (props: Props) => {
  return (
    <div className={'sidebar ' + props.expand + '-expanded'}>
      {catalogList.map((a, i) => {
        return (
          <SidebarItem
            onClick={props.onChangeSidebarExpand}
            icon={a.icon}
            sidebarExpand={props.expand}
            key={i}
            name={a.name}
            listItem={a.listItem}
          />
        );
      })}
    </div>
  );
};

export default Sidebar;
