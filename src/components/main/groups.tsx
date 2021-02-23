/* eslint-disable no-console */
import React from "react";
import { Menu, Item, useContextMenu, ItemParams } from "react-contexify";
import { Grid } from "@material-ui/core";

const MENU_ID = "sidebar-content-menu";

const SibeBarGroups = ({
  groups,
  selectedGroup,
  LoadServer,
  setSelectedGroup,
  setCreateGroupDialog,
  setRenameGroupDialog,
  setDeleteGroupDialog,
  LoadGroupAllServers,
  LoadGroupAllHosted,
}: {
  groups: string[];
  selectedGroup: string;
  LoadServer: (group: string) => number;
  setCreateGroupDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setRenameGroupDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteGroupDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedGroup: React.Dispatch<React.SetStateAction<string>>;
  LoadGroupAllServers: (group: string) => Promise<unknown>;
  LoadGroupAllHosted: () => Promise<unknown>;
}) => {
  const { show } = useContextMenu({ id: MENU_ID });

  const handleGroupContext = async (name: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (selectedGroup !== name) LoadServer(name);
    setSelectedGroup(name);
    show(e, { props: { key: name } });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const handleItemRename = (_args: ItemParams<any, any>) => {
    setRenameGroupDialog(true);
    return 1;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const handleItemDelete = async (_args: ItemParams<any, any>) => {
    setDeleteGroupDialog(true);
    return 1;
  };

  return (
    <Grid item xs={2}>
      <div>
        <Menu id={MENU_ID} theme="dark">
          <Item onClick={handleItemRename}>
            <div style={{ display: "flex" }}>
              <svg width="12" height="13" viewBox="0 0 14 8" fill="#F5F5F5" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7 8C4.06229 8 1.03843 6.34547 0 4C1.03843 1.65454 4.06229 0 7 0C9.93771 0 12.9616 1.65454 14 4C12.9616 6.34546 9.93771 8 7 8ZM7 6C8.10457 6 9 5.10457 9 4C9 2.89543 8.10457 2 7 2C5.89543 2 5 2.89543 5 4C5 5.10457 5.89543 6 7 6Z"
                />
              </svg>

              <span style={{ fontSize: "12px", paddingLeft: "10px" }}>Rename</span>
            </div>
          </Item>
          <Item onClick={handleItemDelete}>
            <div style={{ display: "flex" }}>
              <svg width="12" height="13" viewBox="0 0 12 13" fill="#F5F5F5" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 1C4 0.447715 4.44772 0 5 0H7C7.55228 0 8 0.447715 8 1H11C11.5523 1 12 1.44772 12 2C12 2.55228 11.5523 3 11 3H1C0.447715 3 0 2.55228 0 2C0 1.44772 0.447715 1 1 1H4Z" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 4C1.89543 4 1 4.89543 1 6V11C1 12.1046 1.89543 13 3 13H9C10.1046 13 11 12.1046 11 11V6C11 4.89543 10.1046 4 9 4H3ZM4 6C3.44772 6 3 6.44772 3 7V10C3 10.5523 3.44772 11 4 11C4.55228 11 5 10.5523 5 10V7C5 6.44772 4.55228 6 4 6ZM7 7C7 6.44772 7.44772 6 8 6C8.55228 6 9 6.44772 9 7V10C9 10.5523 8.55228 11 8 11C7.44772 11 7 10.5523 7 10V7Z"
                />
              </svg>
              <span style={{ fontSize: "12px", paddingLeft: "10px" }}>Delete group</span>
            </div>
          </Item>
        </Menu>
      </div>
      <div className="sideBar">
        <div className="sideBarGroups">
          <button
            type="button"
            className={selectedGroup === "Favorites" ? "sbtn active" : "sbtn"}
            onClick={async () => {
              LoadGroupAllServers("Favorites");
            }}>
            <svg width="14" height="11" viewBox="0 0 16 14" fill="#F5F5F5" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 0.999634C7.16434 0.371945 6.12561 0 5 0C2.23858 0 0 2.23858 0 5C0 5.47652 0.0666617 5.93748 0.191168 6.37405C1.22181 10.1739 6.13016 13.6391 7.77079 13.9736C7.84439 13.9909 7.92113 14 8 14C8.07887 14 8.15561 13.9909 8.22921 13.9736C9.86984 13.6391 14.7782 10.1739 15.8088 6.37405C15.9333 5.93748 16 5.47653 16 5C16 2.23858 13.7614 0 11 0C9.87439 0 8.83566 0.371945 8 0.999634Z" />
            </svg>
            <span className="sbtnText">Favorites</span>
          </button>
          <button
            type="button"
            className={selectedGroup === "Hosted" ? "sbtn active" : "sbtn"}
            onClick={async () => {
              LoadGroupAllHosted();
            }}>
            <svg width="14" height="11" viewBox="0 0 12 14" fill="#F5F5F5" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 0.292893C5.68342 -0.0976311 6.31658 -0.0976311 6.70711 0.292893L11.7071 5.29289C12.0976 5.68342 12.0976 6.31658 11.7071 6.70711C11.3166 7.09763 10.6834 7.09763 10.2929 6.70711L7 3.41421V13C7 13.5523 6.55228 14 6 14C5.44772 14 5 13.5523 5 13V3.41421L1.70711 6.70711C1.31658 7.09763 0.683417 7.09763 0.292893 6.70711C-0.0976311 6.31658 -0.0976311 5.68342 0.292893 5.29289L5.29289 0.292893Z"
              />
            </svg>
            <span className="sbtnText">Hosted</span>
          </button>
          {groups.length > 0 &&
            groups.map((name, index) => {
              return (
                <button
                  key={`${name}-${String(index)}`}
                  type="button"
                  className={selectedGroup === name ? "sbtn active" : "sbtn"}
                  onClick={async () => {
                    LoadGroupAllServers(name);
                  }}
                  onContextMenu={(e) => {
                    handleGroupContext(name, e);
                  }}>
                  <svg width="14" height="11" viewBox="0 0 14 11" fill="#F5F5F5" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2H8C8 3.10457 7.10457 4 6 4H0V9C0 10.1046 0.89543 11 2 11H12C13.1046 11 14 10.1046 14 9V4C14 2.89543 13.1046 2 12 2Z" />
                    <path d="M0 1.5C0 0.671573 0.671573 0 1.5 0H5.5C6.32843 0 7 0.671573 7 1.5C7 2.32843 6.32843 3 5.5 3H1C0.447715 3 0 2.55228 0 2V1.5Z" />
                  </svg>
                  <span className="sbtnText">{name}</span>
                </button>
              );
            })}
          <button
            style={{ margin: "auto" }}
            type="button"
            className="lbtn"
            onClick={() => {
              setCreateGroupDialog(true);
            }}>
            <span className="btnText">Create Group</span>
          </button>
        </div>
      </div>
    </Grid>
  );
};

export default SibeBarGroups;
