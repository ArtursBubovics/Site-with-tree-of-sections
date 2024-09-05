<?php

session_start();

require '../db.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(403);
    echo json_encode(['error' => 'User not authenticated']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!empty($data['title']) && !empty($data['description'])) {

        $sectionId = intval($data['sectionId']);
        $title = $conn->real_escape_string($data['title']);
        $description = $conn->real_escape_string($data['description']);
        $userId = $_SESSION['user_id'];

        $stmt = $conn->prepare('UPDATE sections SET title = ?, description = ? WHERE id = ? AND user_id = ?');
        if ($stmt === false) {
            echo json_encode(['error' => 'Failed to prepare SQL statement']);
            exit();
        }

        $stmt->bind_param('ssii', $title, $description, $sectionId, $userId);
        
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to create section']);
        }

        $stmt->close();
    } else {
        echo json_encode(['error' => 'Invalid input']);
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Invalid request method']);
}
?>