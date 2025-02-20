'use client';

import Link from 'next/link';
import { dark } from '@clerk/themes';
import React, { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { usePurchaseCredits } from '@/hooks/useBilling';
import LoadingSpinner from '@/components/LoadingSpinner'
import { useAuth, UserButton, useUser } from '@clerk/nextjs';
import { loadStripe } from '@stripe/stripe-js';
import { useSidebarContext } from '@/context/SidebarContext';

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

const Sidebar = () => {
  const { isCollapsed, setIsCollapsed } = useSidebarContext();
  const pathname = usePathname();
  const { getSessionId, isLoading: isPurchasing, error: purchaseError } = usePurchaseCredits();
  const { user } = useUser();
  const { getToken } = useAuth();

  const handleUpgrade = async () => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error('No token available');
      }
    
      const sessionId = await getSessionId(token);

      if (!stripeKey) {
        
        throw new Error('No Stripe key available');
      }
      const stripe = await loadStripe(stripeKey);

      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }
      // Redirect to Checkout
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error('Stripe redirect failed:', error);
      }
    } catch (error) {
      console.error('Failed to purchase credits:', error);
    }
  };

  const handleManageSubscription = () => {
    if (user?.emailAddresses[0].emailAddress) {
      window.location.href = `${process.env.NEXT_SUBSCRIPTION_MANAGEMENT_URL}`;
    } else {
      console.error('No email address found for the user');
    }
  };

  return (
    <aside 
      role="complementary"
      className={`h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'
        } relative`}
    >
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && (
          <div className="transition-opacity duration-300">
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-gray-700 rounded"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" role="img" aria-hidden="true">
            {isCollapsed 
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            }
          </svg>
        </button>
      </div>

      <nav className="mt-8">
        <Link
          href="/"
          className={`block py-2 px-4 mx-2 rounded transition-colors ${
            pathname === '/' ? 'bg-gray-700' : 'hover:bg-gray-700'
          }`}
        >
          {isCollapsed ? '🤖' : 'Agents'}
        </Link>
        <Link
          href="/orders"
          className={`block py-2 px-4 mx-2 rounded transition-colors ${
            pathname === '/orders' ? 'bg-gray-700' : 'hover:bg-gray-700'
          }`}
        >
          {isCollapsed ? '📋' : 'Orders'}
        </Link>
      </nav>

      <div className="flex flex-col h-[calc(100%-12rem)]">
        <div className="flex-grow"></div>
        
        <div className="p-4 border-t border-gray-700">
          <UserButton appearance={{ baseTheme: dark }} />
        </div>

        {!isCollapsed && user && (
          <div className="p-4 border-t border-gray-700">
            {(
              <>
                <button
                  className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700
                           transition-colors disabled:opacity-50"
                  onClick={handleUpgrade}
                  disabled={isPurchasing}
                >
                  {isPurchasing ? 'Processing...' : 'Upgrade'}
                </button>
                <div className="mt-2"></div>
              </>
            )}
            <button
              className="w-full bg-gray-700 text-gray-100 py-2 rounded-md hover:bg-gray-600
                       transition-colors disabled:opacity-50 border border-gray-600"
              onClick={handleManageSubscription}
            >
              Manage Subscription
            </button>
            {purchaseError && <p className="mt-2 text-sm text-red-500">Failed to purchase credits. Please try again.</p>}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar; 