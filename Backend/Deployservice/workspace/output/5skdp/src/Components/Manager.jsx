import React from "react";
import { useState, useRef, useEffect } from "react";
import './Manager.css';

const Manager = () => {
  const iconref = useRef();
  const passref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [PasswordArray, SetPasswordArray] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({ site: "", username: "", password: "" });
  

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    let PasswordArray;
    if (passwords) {
      SetPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const togglePassword = () => {
    if (
      iconref.current.src.includes(
        "/visibility_off_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
      )
    ) {
      iconref.current.src =
        "/visibility_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
      passref.current.type = "text";
    } else {
      iconref.current.src =
        "/visibility_off_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
      passref.current.type = "password";
    }
  };

  const HandleChange = (item) => {
    setform({ ...form, [item.target.name]: item.target.value });
  };

  const SavePassword = () => {

     if (!form.site || !form.username || !form.password) {
    alert("Please fill all fields!");
    return;
  }
    SetPasswordArray([...PasswordArray, form]);
    localStorage.setItem("passwords", JSON.stringify([...PasswordArray, form]));
  };


  const DeletePassword = (index) => {
    const newPasswordArray = PasswordArray.filter((_, i) => i !== index);
    SetPasswordArray(newPasswordArray);
    localStorage.setItem("passwords", JSON.stringify(newPasswordArray));
  };

  const EditPassword = (index) => {
    const entryToEdit = PasswordArray[index];
    setEditForm(entryToEdit);
    setEditingIndex(index);
  };

  const SaveEdit = () => {
    if (!editForm.site || !editForm.username || !editForm.password) {
      alert("Please fill all fields!");
      return;
    }
    
    const newPasswordArray = [...PasswordArray];
    newPasswordArray[editingIndex] = editForm;
    SetPasswordArray(newPasswordArray);
    localStorage.setItem("passwords", JSON.stringify(newPasswordArray));
    setEditingIndex(null);
    setEditForm({ site: "", username: "", password: "" });
  };

  const CancelEdit = () => {
    setEditingIndex(null);
    setEditForm({ site: "", username: "", password: "" });
  };

  const HandleEditChange = (item) => {
    setEditForm({ ...editForm, [item.target.name]: item.target.value });
  };
  return (
    <>
      <div className="m-auto text-center mt-10 mb-10">
        <h2 className="text-xl font-bold  ">
          &lt; Pass<span className="text-blue-600">OP/&gt;</span>
        </h2>
        <p className="text-lg">Your Password Manager..!</p>
      </div>
      <div className="   bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] h-full">
        <div className=" ml-50 mr-50 mt-1 h-full  ">
          <div>
            <input
              className="rounded-full p-3 border-2 w-full"
              type="text"
              placeholder="Enter your site URL"
              value={form.site}
              name="site"
              onChange={HandleChange}
               required
            />
          </div>

          <div className="flex justify-between gap-4 mt-5 ">
            <input
              className="rounded-full p-3 border-2 w-full"
              type="text"
              placeholder="Enter your Username"
              value={form.username}
              name="username"
              onChange={HandleChange}
               required
            />
            <input
              className="rounded-full p-3 border-2 w-100 relative"
              type="password"
              placeholder="Enter your Password"
              value={form.password}
              name="password"
              onChange={HandleChange}
              ref={passref}
               required
            />
            <span
              className=" absolute left-320 top-70"
              onClick={togglePassword}
            >
              <img
                src="/visibility_off_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
                ref={iconref}
                className="invert"
              />
            </span>
          </div>

          <center>
            <button
              className="flex justify-center items-center bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 transition-colors duration-300 mt-5 w-70 "
              onClick={SavePassword}
            >
              Add Your Password
            </button>
          </center>
        </div>

        <div className="ml-40 mt-10 mb-5">
          <h2 className="text-xl font-bold ">Your Saved Passwords </h2>

          {PasswordArray.length === 0 ? (
            "No Passwords to Show"
          ) : (
            <table className="border-2 border-black-600 w-300 mt-7 ">
              <thead>
                <tr className="bg-blue-800 text-white text-center">
                  <th>S.No</th>
                  <th>Site Name</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {PasswordArray.map((form, index) => (
                  <tr className="bg-blue-100 text-center" key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {editingIndex === index ? (
                        <input
                          className="rounded p-1 border w-full"
                          type="text"
                          value={editForm.site}
                          name="site"
                          onChange={HandleEditChange}
                        />
                      ) : (
                        <a
                          href={
                            form.site.startsWith("http")
                              ? form.site
                              : `https://${form.site}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {form.site}
                        </a>
                      )}
                    </td>
                    <td className="flex items-center justify-center gap-2">
                      {editingIndex === index ? (
                        <input
                          className="rounded p-1 border w-full"
                          type="text"
                          value={editForm.username}
                          name="username"
                          onChange={HandleEditChange}
                        />
                      ) : (
                        <>
                          <span>{form.username}</span>
                          <img
                            onClick={() => {
                              alert("Username Copied!");
                              navigator.clipboard.writeText(form.username);
                            }}
                            src="/content_copy_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
                            className="invert cursor-pointer h-5"
                            alt="copy"
                          />
                        </>
                      )}
                    </td>
                    <td>
                      <div className="flex items-center justify-center">
                        {editingIndex === index ? (
                          <input
                            className="rounded p-1 border w-full"
                            type="text"
                            value={editForm.password}
                            name="password"
                            onChange={HandleEditChange}
                          />
                        ) : (
                          <>
                            <span>{form.password}</span>
                            <img
                              onClick={() => {
                                alert("Password Copied!");
                                navigator.clipboard.writeText(form.password);
                              }}
                              src="/content_copy_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
                              className="invert cursor-pointer h-5"
                              alt="copy"
                            />
                          </>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-center gap-2">
                        {editingIndex === index ? (
                          <>
                            <button
                              className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                              onClick={SaveEdit}
                            >
                              Save
                            </button>
                            <button
                              className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                              onClick={CancelEdit}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <img
                              src="/edit_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
                              alt="edit"
                              className="invert cursor-pointer"
                              onClick={() => EditPassword(index)}
                            />
                            <img
                              src="/delete_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
                              alt="delete"
                              className="invert cursor-pointer"
                              onClick={() => DeletePassword(index)}
                            />
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
