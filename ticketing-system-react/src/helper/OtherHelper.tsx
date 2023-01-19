
import React from 'react'

const OtherHelper = () => {
    const statusColors = [
        { 'name': 'open', 'color': 'bg-green-500 text-white' },
        { 'name': 'in-progress', 'color': 'bg-orange-500 text-white' },
        { 'name': 'closed', 'color': 'bg-blue-500 text-white' },
        { 'name': 'pending other', 'color': 'bg-amber-500 text-white' },
        { 'name': 'work in progress', 'color': 'bg-fuchsia-500 text-white' },
        { 'name': 'assigned', 'color': 'bg-indigo-500 text-white' },
        { 'name': 'resolved', 'color': 'bg-pink-500 text-white' },
        { 'name': 'pending customer', 'color': 'bg-rose-500 text-white' }
    ];

    const returningStatusColor = (status: string) => {
        return status ? statusColors.find((color) => status === color.name) : {color: ''};
    }

  return {
    returningStatusColor
  }
}

export default OtherHelper