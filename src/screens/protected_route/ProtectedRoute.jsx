import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ user, component: Component, ...rest }) {
    if (!user) return <Navigate to="/login" replace/>
    else return <Component />
}

export default ProtectedRoute