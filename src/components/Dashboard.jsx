import React from 'react';
import Header from './Header';
import PromotionalSection from './PromotionalSection';
import TransferWidget from './TransferWidget';

function Dashboard({ user, handleLogout }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header user={user} handleLogout={handleLogout} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Section - Promotional Content */}
          <div className="order-2 lg:order-1">
            <PromotionalSection />
          </div>

          {/* Right Section - Transfer Widget */}
          <div className="order-1 lg:order-2">
            <TransferWidget />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;

