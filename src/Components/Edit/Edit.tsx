import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";
import "./Edit.scss";
import API from "services/rootApi";

interface Type {
  closeModal: any;
}

const Edit = ({ closeModal }: Type) => {
  const { changeLanguage } = useSelector((state: any) => state.changeLanguge);

  const avatar: any = localStorage.getItem("avatar");
  const local: any = localStorage.getItem("user");
  const data = JSON.parse(local);

  const [file, setFile] = useState<any>(avatar);
  const [firstName, setFirstName] = useState(data.first_name);
  const [lastName, setLastName] = useState(data.last_name);
  const [number, setNumber] = useState(data.number);
  const [address, setaddress] = useState(data.address);

  function handleChange(e: any) {
    setFile(URL.createObjectURL(e.target.files[0]));
    localStorage.setItem("rasm", URL.createObjectURL(e.target.files[0]));
  }
  const onSubmit = () => {
    const dataa: any = {
      username: data.username,
      email: data.email,
      first_name: firstName?.length === 0 ? data.first_name : firstName,
      last_name: lastName?.length === 0 ? data.last_name : lastName,
      number: number?.length === 0 ? data.number : number,
      address: address?.length === 0 ? data.address : address,
      id: data.id,
    };

    if (local !== null) {
      API.put(`/user/${data.id}`, dataa).then((res) => {
        if (res.status === 200) {
          localStorage.setItem("user", JSON.stringify(dataa));
          closeModal(false);
        }
      });
    }
    if (file.length > 0) {
      localStorage.setItem("avatar", file);
    }
  };

  return (
    <div className="edit-container">
      <div className="btn-wrapper">
        <CloseOutlined
          className="close-wrapper__btn"
          onClick={() => closeModal(false)}
        />
      </div>

      <div className="added-image">
        <span className="profile-img">
          {file ? (
            <img src={file} width={90} height={90} />
          ) : (
            <svg
              width="85"
              height="85"
              viewBox="0 0 85 85"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M42.4999 18.2144C39.4978 18.2144 36.5632 19.1046 34.0671 20.7724C31.571 22.4402 29.6255 24.8108 28.4767 27.5843C27.3279 30.3579 27.0273 33.4098 27.6129 36.3541C28.1986 39.2985 29.6442 42.003 31.767 44.1258C33.8898 46.2486 36.5943 47.6942 39.5387 48.2798C42.483 48.8655 45.5349 48.5649 48.3085 47.4161C51.082 46.2673 53.4525 44.3218 55.1204 41.8257C56.7882 39.3296 57.6784 36.395 57.6784 33.3929C57.6784 29.3673 56.0793 25.5066 53.2327 22.6601C50.3862 19.8135 46.5255 18.2144 42.4999 18.2144Z"
                fill="#D6D6D6"
              ></path>
              <path
                d="M42.5 0C34.0943 0 25.8774 2.49258 18.8883 7.16254C11.8992 11.8325 6.45186 18.4701 3.23514 26.2359C0.0184145 34.0018 -0.823227 42.5471 0.816645 50.7913C2.45652 59.0355 6.50425 66.6083 12.448 72.552C18.3917 78.4958 25.9645 82.5435 34.2087 84.1834C42.4529 85.8232 50.9982 84.9816 58.7641 81.7649C66.5299 78.5481 73.1675 73.1008 77.8375 66.1117C82.5074 59.1226 85 50.9057 85 42.5C84.9871 31.2322 80.5054 20.4297 72.5378 12.4622C64.5703 4.49465 53.7678 0.0128554 42.5 0V0ZM66.7614 69.5968C66.7009 65.6149 65.0786 61.8162 62.244 59.0191C59.4094 56.222 55.5895 54.6503 51.6071 54.6428H33.3929C29.4106 54.6503 25.5906 56.222 22.756 59.0191C19.9214 61.8162 18.2991 65.6149 18.2386 69.5968C12.7335 64.6812 8.85134 58.2094 7.10612 51.0384C5.3609 43.8674 5.83496 36.3355 8.46553 29.4399C11.0961 22.5443 15.7591 16.6104 21.837 12.4239C27.915 8.23731 35.1212 5.99561 42.5015 5.99561C49.8818 5.99561 57.0881 8.23731 63.166 12.4239C69.244 16.6104 73.907 22.5443 76.5375 29.4399C79.1681 36.3355 79.6422 43.8674 77.8969 51.0384C76.1517 58.2094 72.2695 64.6812 66.7645 69.5968H66.7614Z"
                fill="#ccc"
              ></path>
            </svg>
          )}
        </span>
        <label htmlFor="file">Add photo</label>
      </div>

      <form className="form">
        <Input
          onChange={(e: any) => setFirstName(e.target.value)}
          value={firstName}
          placeholder={!changeLanguage ? "Ism" : "Имя"}
        />
        <Input
          onChange={(e: any) => setLastName(e.target.value)}
          value={lastName}
          placeholder={!changeLanguage ? "Familiya" : "Фамилия"}
        />
        <Input
          onChange={(e: any) => setNumber(e.target.value)}
          value={number}
          type="number"
          placeholder={!changeLanguage ? "Raqam" : "Номер"}
        />
        <Input
          onChange={(e: any) => setaddress(e.target.value)}
          value={address}
          placeholder={!changeLanguage ? "Yetkazish manzili" : "Адрес доставки"}
        />
        <Input
          onChange={handleChange}
          type="file"
          id="file"
          accept=".png,.jpeg,.doc,.jpg"
          
        />
      </form>

      <div className="btn-wrapper" onClick={onSubmit}>
        <Button className="edit-btn" type="primary">
          {!changeLanguage ? "Tahrirlash" : "Редактировать"}
        </Button>
      </div>
    </div>
  );
};

export default Edit;
