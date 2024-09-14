import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ children, Authentication = true }) => {
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.authStatus);

  useEffect(() => {
    if (Authentication && authStatus !== Authentication) {
      navigate("/login");
    } else if (!Authentication && authStatus !== Authentication) {
      navigate("/");
    }
    setloading(false);
  }, [authStatus, Authentication, navigate]);

  return loading ? null : children;
};

export default Protected;
