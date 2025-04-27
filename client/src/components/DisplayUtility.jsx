import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get URL parameters

function UtilityDisplay() {
  // Get utilityId from URL parameters
  const { utilityId } = useParams();
  
  const [utility, setUtility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);

  useEffect(() => {
    async function fetchUtility() {
      try {
        setLoading(true);
        setError(null);
        setDebugInfo(null);
        
        // Debug info: show what URL we're fetching
        const url = `/utility/${utilityId}`; // Notice the /api prefix - adjust if needed
        console.log(`Attempting to fetch from: ${url}`);
        
        // Fetch with no automatic JSON parsing
        const response = await fetch(url);
        
        // Save debug info about the response
        const responseDebugInfo = {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries([...response.headers.entries()]),
          url: response.url
        };
        
        // Get the raw text response
        const rawText = await response.text();
        console.log("Raw response:", rawText);
        
        // Add the raw response to debug info
        responseDebugInfo.rawResponsePreview = rawText.substring(0, 200) + "...";
        setDebugInfo(responseDebugInfo);
        
        // Try to parse as JSON
        try {
          const data = JSON.parse(rawText);
          console.log("Successfully parsed JSON data:", data);
          
          if (data.payload && data.payload.utility) {
            setUtility(data.payload.utility);
          } else {
            throw new Error(data.message || "Utility not found in response");
          }
        } catch (parseError) {
          console.error("JSON parse error:", parseError);
          throw new Error("Received invalid response from server");
        }
      } catch (err) {
        console.error("Error in fetch:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (utilityId) {
      fetchUtility();
    } else {
      setError("No utility ID provided");
      setLoading(false);
    }
  }, [utilityId]);

  if (loading) return <p>Loading utility...</p>;
  
  if (error) {
    return (
      <div className="error-display">
        <h3>Error</h3>
        <p>{error}</p>
        
        {debugInfo && (
          <div className="debug-info" style={{ margin: '20px 0', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <h4>Debug Information</h4>
            <p><strong>Status:</strong> {debugInfo.status} {debugInfo.statusText}</p>
            <p><strong>URL:</strong> {debugInfo.url}</p>
            
            <div>
              <p><strong>Headers:</strong></p>
              <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
                {JSON.stringify(debugInfo.headers, null, 2)}
              </pre>
            </div>
            
            <div>
              <p><strong>Response Preview:</strong></p>
              <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto', maxHeight: '200px' }}>
                {debugInfo.rawResponsePreview}
              </pre>
            </div>
          </div>
        )}
        
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }
  
  if (!utility) return <p>No utility found.</p>;

  return (
    <div className="utility-card">
      <h2>{utility.name}</h2>
      {utility.cost !== undefined && (
        <p><strong>Cost:</strong> ${typeof utility.cost === 'number' ? utility.cost.toFixed(2) : utility.cost}</p>
      )}
      <p><strong>Water Usage:</strong> {utility.waterCost} liters</p>
      <p>{utility.description}</p>
    </div>
  );
}

export default UtilityDisplay;